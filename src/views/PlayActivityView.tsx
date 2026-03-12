import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import LiveMapCard from '../components/LiveMapCard';
import PlayHeader from '../components/play/PlayHeader';
import PlayMissionCard from '../components/play/PlayMissionCard';
import PlayItineraryDrawer from '../components/play/PlayItineraryDrawer';
import { Activity, Step, Mission } from '../models/activity';

type Props = {
  activity: Activity;
  currentStep: Step;
  currentMission: Mission;
  onValidate: (answer: string) => void;
  onSelectStep: (stepIndex: number) => void;
  stepIndex: number;
  missionIndex: number;
  totalSteps: number;
  feedback: string | null;
  userLocation: Location.LocationObject | null;
};

const PlayActivityView: React.FC<Props> = ({
  activity,
  currentStep,
  currentMission,
  onValidate,
  onSelectStep,
  stepIndex,
  missionIndex,
  totalSteps,
  feedback,
  userLocation,
}) => {
  const [answer, setAnswer] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = () => {
    const valueToValidate = isPhotoMission ? 'photo_taken_mock' : answer;
    onValidate(valueToValidate);
    if (!isPhotoMission) {
      setAnswer('');
    }
  };

  const isPhotoMission =
    currentMission.type === 'photo' || currentMission.victoryCondition === 'photo_taken';

  const remainingSteps = activity.steps.slice(stepIndex);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <PlayHeader
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onDrawerOpen={() => setIsDrawerOpen(true)}
        />

        {/* Content */}
        <ScrollView
          className="flex-1 px-5 py-6"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Live Map Card */}
          <View className="mb-6">
            <LiveMapCard
              destination={{ latitude: currentStep.poiLat, longitude: currentStep.poiLng }}
              userLocation={userLocation}
            />
          </View>

          {/* Step Info */}
          <Text className="text-gray-500 mb-2 uppercase tracking-wider text-xs font-bold">
            Lieu à rejoindre
          </Text>
          <Text className="text-3xl text-gray-900 font-bold mb-8">
            {currentStep.description}
          </Text>

          {/* Mission Card */}
          <PlayMissionCard
            mission={currentMission}
            missionIndex={missionIndex}
            answer={answer}
            onAnswerChange={setAnswer}
            feedback={feedback}
            isPhotoMission={isPhotoMission}
            onValidate={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Itinerary Drawer with Safe Area Support */}
      <PlayItineraryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        remainingSteps={remainingSteps}
        stepIndex={stepIndex}
        onSelectStep={onSelectStep}
      />
    </SafeAreaView>
  );
};

export default PlayActivityView;
