import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Step, Mission } from '../../models/activity';
import AdminStepEditor from './AdminStepEditor';

type Props = {
  steps: Step[];
  onAddStep: () => void;
  onUpdateStep: (stepIndex: number, step: Step) => void;
  onRemoveStep: (stepIndex: number) => void;
  onAddMission: (stepIndex: number) => void;
  onUpdateMission: (stepIndex: number, missionIndex: number, mission: Mission) => void;
  onRemoveMission: (stepIndex: number, missionIndex: number) => void;
  onMissionFocus: (stepIndex: number, missionIndex: number) => void;
  stepRefs: React.RefObject<{ [key: number]: View | null }>;
  missionCardRefs: React.RefObject<{ [key: string]: View | null }>;
  hapticLight: () => void;
  hapticMedium: () => void;
};

const AdminStepsSection: React.FC<Props> = ({
  steps,
  onAddStep,
  onUpdateStep,
  onRemoveStep,
  onAddMission,
  onUpdateMission,
  onRemoveMission,
  onMissionFocus,
  stepRefs,
  missionCardRefs,
  hapticLight,
  hapticMedium
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Steps</Text>
        <Pressable 
          onPress={() => {
            hapticLight();
            onAddStep();
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Text className="text-blue-600 font-semibold">+ Add Step</Text>
        </Pressable>
      </View>

      {steps.length === 0 ? (
        <View className="py-8 border border-dashed border-gray-300 rounded">
          <Text className="text-gray-400 text-center">No steps yet. Add one to get started.</Text>
        </View>
      ) : (
        steps.map((step, stepIndex) => (
          <View
            key={step.id}
            ref={(ref) => { stepRefs.current[stepIndex] = ref; }}
          >
            <AdminStepEditor
              step={step}
              stepIndex={stepIndex}
              onUpdateStep={(updatedStep) => onUpdateStep(stepIndex, updatedStep)}
              onRemoveStep={() => onRemoveStep(stepIndex)}
              onAddMission={() => onAddMission(stepIndex)}
              onUpdateMission={(missionIndex, mission) => onUpdateMission(stepIndex, missionIndex, mission)}
              onRemoveMission={(missionIndex) => onRemoveMission(stepIndex, missionIndex)}
              onMissionFocus={onMissionFocus}
              missionCardRefs={missionCardRefs}
              hapticLight={hapticLight}
              hapticMedium={hapticMedium}
            />
          </View>
        ))
      )}
    </View>
  );
};

export default AdminStepsSection;
