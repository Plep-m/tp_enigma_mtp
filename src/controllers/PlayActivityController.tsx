import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import PlayActivityView from '../views/PlayActivityView';
import { useAppNavigation } from '../navigation/StackNavigator';
import { Activity } from '../models/activity';
import { useProfile } from '../hooks/useProfile';

const PlayActivityController: React.FC = () => {
  const { params, navigate } = useAppNavigation();
  const { addXp, completeActivity } = useProfile();
  
  const activity = params?.activity as Activity;
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  // Request location permission and watch position on mount
  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const initializeLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        const granted = status === 'granted';

        if (!granted) {
          Alert.alert(
            'Permission Requise',
            'Le GPS est nécessaire pour valider votre position. Veuillez activer la permission.'
          );
          return;
        }

        // Watch position for continuous updates
        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 5 },
          (location) => setUserLocation(location)
        );
      } catch (error) {
        console.error('[PlayActivityController] Location initialization error:', error);
        Alert.alert('Erreur GPS', 'Impossible d\'initialiser le GPS.');
      }
    };

    initializeLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // Early return after all hooks
  if (!activity || !activity.steps || activity.steps.length === 0) {
    return null; // Or error view
  }

  const currentStep = activity.steps[currentStepIndex];
  const currentMission = currentStep.missions[currentMissionIndex];

  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in meters
   */
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000; // Earth radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  /**
   * Check if user is within the current step's radius
   */
  const isWithinRadius = (): boolean => {
    if (!userLocation) return false;

    const distance = calculateDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      currentStep.poiLat,
      currentStep.poiLng
    );

    return distance <= currentStep.radius;
  };

  /**
   * Check if mission answer satisfies the victory condition
   * Supports: exact, contains, approximate (numeric), photo_taken, and fallback
   */
  const checkVictoryCondition = (answer: string): boolean => {
    const victoryType = currentMission.victoryCondition || 'default';
    const expected = currentMission.expectedAnswer || '';

    switch (victoryType) {
      case 'exact':
        return answer.toLowerCase().trim() === expected.toLowerCase().trim();

      case 'contains':
        return answer.toLowerCase().includes(expected.toLowerCase());

      case 'approximate': {
        // Numeric tolerance check
        const userValue = parseFloat(answer);
        const expectedValue = parseFloat(expected);
        if (isNaN(userValue) || isNaN(expectedValue)) {
          // Fallback to exact match if not numeric
          return answer.toLowerCase().trim() === expected.toLowerCase().trim();
        }
        // Default tolerance: 10% or at least 1 unit
        const tolerance = Math.max(Math.abs(expectedValue) * 0.1, 1);
        return Math.abs(userValue - expectedValue) <= tolerance;
      }

      case 'photo_taken':
        // Any photo submission is valid for photo missions
        return answer === 'photo_taken_mock' || answer.startsWith('photo');

      default:
        // Fallback: if no explicit condition but expected answer exists, use exact match
        if (expected) {
          return answer.toLowerCase().trim() === expected.toLowerCase().trim();
        }
        // No validation condition needed (e.g., observation/action missions)
        return true;
    }
  };

  const handleValidate = async (answer: string) => {
    try {
      // Check GPS proximity first
      const withinRadius = isWithinRadius();
      if (!withinRadius) {
        const distance = userLocation
          ? calculateDistance(
              userLocation.coords.latitude,
              userLocation.coords.longitude,
              currentStep.poiLat,
              currentStep.poiLng
            )
          : null;

        setFeedback('❌ Hors de la zone ! Rapproche-toi du lieu.');
        const distanceMsg = distance
          ? ` (Distance: ${Math.round(distance)}m, Zone: ${currentStep.radius}m)`
          : '';
        Alert.alert(
          'Hors de la zone',
          `Tu dois être dans la zone définie pour cette étape.${distanceMsg}`
        );
        return;
      }

      // Check mission victory condition
      const answerValid = checkVictoryCondition(answer);
      if (!answerValid) {
        setFeedback('❌ Mauvaise réponse ! Essaie encore.');
        Alert.alert('Incorrect', 'Ce n\'est pas la bonne réponse.');
        return;
      }

      // Both conditions satisfied
      setFeedback('✅ Correct ! 🎉');
      setTimeout(() => {
        setFeedback(null);
        advance();
      }, 1000);
    } catch (error) {
      console.error('[PlayActivityController] Validation error:', error);
    }
  };

  const advance = () => {
    const hasNextMission = currentMissionIndex + 1 < currentStep.missions.length;
    
    if (hasNextMission) {
        setCurrentMissionIndex(currentMissionIndex + 1);
    } else {
        // Step complete
        const hasNextStep = currentStepIndex + 1 < activity.steps.length;
        if (hasNextStep) {
            Alert.alert("Étape terminée !", "En route pour la suivante.");
            setCurrentStepIndex(currentStepIndex + 1);
            setCurrentMissionIndex(0);
        } else {
            // Activity complete
            finishActivity();
        }
    }
  };

  const finishActivity = async () => {
    await addXp(100); // 100 XP per activity
    await completeActivity(activity.id);
    Alert.alert(
        "Félicitations ! 🏆",
        "Tu as terminé cette activité et gagné 100 XP !",
        [
            { text: "Retour à l'accueil", onPress: () => navigate('App') }
        ]
    );
  };

  /**
   * Handle step selection from drawer
   * Jump to the selected step and reset mission index
   */
  const handleSelectStep = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
    setCurrentMissionIndex(0);
    setFeedback(null);
  };

  return (
    <PlayActivityView
      activity={activity}
      currentStep={currentStep}
      currentMission={currentMission}
      onValidate={handleValidate}
      onSelectStep={handleSelectStep}
      stepIndex={currentStepIndex}
      missionIndex={currentMissionIndex}
      totalSteps={activity.steps.length}
      feedback={feedback}
      userLocation={userLocation}
    />
  );
};

export default PlayActivityController;
