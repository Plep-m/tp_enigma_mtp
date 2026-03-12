import React, { useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRScanner from '../components/QRScanner';
import { Activity, Step, Mission } from '../models/activity';
import { useAppNavigation } from '../navigation/StackNavigator';
import { impactAsync, ImpactFeedbackStyle, notificationAsync, NotificationFeedbackType } from 'expo-haptics';
import { useMissionCardKeyboardScroll } from '../hooks/useMissionCardKeyboardScroll';
import {
  AdminHeader,
  AdminActivityFields,
  AdminStepsSection,
  AdminQRSection,
  AdminQRControls
} from '../components/admin';

type Props = {
  activity: Activity | null;
  generatedQRCode: string | null;
  isScanning: boolean;
  onUpdateActivity: (activity: Activity) => void;
  onGenerateQR: () => void;
  onStartScanning: () => void;
  onScan: (data: string) => void;
  onCloseScanner: () => void;
  onCreateBlank: () => void;
};

const AdminView: React.FC<Props> = ({
  activity,
  generatedQRCode,
  isScanning,
  onUpdateActivity,
  onGenerateQR,
  onStartScanning,
  onScan,
  onCloseScanner,
  onCreateBlank,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const stepRefs = useRef<{ [key: number]: View | null }>({});
  const missionCardRefs = useRef<{ [key: string]: View | null }>({});
  const { goBack, canGoBack } = useAppNavigation();
  const { handleMissionFocus, handleScroll } = useMissionCardKeyboardScroll(
    scrollViewRef,
    missionCardRefs
  );

  const hapticLight = () => impactAsync(ImpactFeedbackStyle.Light);
  const hapticMedium = () => impactAsync(ImpactFeedbackStyle.Medium);
  const hapticSuccess = () => notificationAsync(NotificationFeedbackType.Success);

  if (isScanning) {
    return <QRScanner onScan={onScan} onClose={onCloseScanner} />;
  }

  const updateStep = (stepIndex: number, updatedStep: Step) => {
    if (!activity) return;
    const newSteps = [...activity.steps];
    newSteps[stepIndex] = updatedStep;
    onUpdateActivity({ ...activity, steps: newSteps });
  };

  const addStep = () => {
    if (!activity) return;
    onUpdateActivity({
      ...activity,
      steps: [...activity.steps, {
        id: Date.now(),
        description: '',
        poiLat: 0,
        poiLng: 0,
        radius: 50,
        missions: []
      }]
    });
  };

  const removeStep = (stepIndex: number) => {
    if (!activity) return;
    onUpdateActivity({
      ...activity,
      steps: activity.steps.filter((_, i) => i !== stepIndex)
    });
  };

  const updateMission = (stepIndex: number, missionIndex: number, updatedMission: Mission) => {
    if (!activity) return;
    const newSteps = [...activity.steps];
    const newMissions = [...newSteps[stepIndex].missions];
    newMissions[missionIndex] = updatedMission;
    newSteps[stepIndex] = { ...newSteps[stepIndex], missions: newMissions };
    onUpdateActivity({ ...activity, steps: newSteps });
  };

  const addMission = (stepIndex: number) => {
    if (!activity) return;
    const newSteps = [...activity.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      missions: [...newSteps[stepIndex].missions, {
        id: Date.now(),
        type: 'photo',
        instruction: '',
        question: '',
        expectedAnswer: ''
      }]
    };
    onUpdateActivity({ ...activity, steps: newSteps });
  };

  const removeMission = (stepIndex: number, missionIndex: number) => {
    if (!activity) return;
    const newSteps = [...activity.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      missions: newSteps[stepIndex].missions.filter((_, i) => i !== missionIndex)
    };
    onUpdateActivity({ ...activity, steps: newSteps });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AdminHeader canGoBack={canGoBack} onGoBack={goBack} />
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-6"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <AdminQRControls
            onStartScanning={onStartScanning}
            onCreateBlank={onCreateBlank}
            hapticMedium={hapticMedium}
            hapticLight={hapticLight}
          />
          {activity && (
            <>
              <AdminActivityFields
                activity={activity}
                onUpdateActivity={onUpdateActivity}
                hapticLight={hapticLight}
              />
              <AdminStepsSection
                steps={activity.steps}
                onAddStep={addStep}
                onUpdateStep={updateStep}
                onRemoveStep={removeStep}
                onAddMission={addMission}
                onUpdateMission={updateMission}
                onRemoveMission={removeMission}
                onMissionFocus={handleMissionFocus}
                stepRefs={stepRefs}
                missionCardRefs={missionCardRefs}
                hapticLight={hapticLight}
                hapticMedium={hapticMedium}
              />
              <AdminQRSection
                generatedQRCode={generatedQRCode}
                onGenerateQR={onGenerateQR}
                hapticSuccess={hapticSuccess}
              />
            </>
          )}
          {!activity && (
            <View className="py-12">
              <Text className="text-gray-400 text-center text-base">
                Scan or create an activity to get started
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminView;
