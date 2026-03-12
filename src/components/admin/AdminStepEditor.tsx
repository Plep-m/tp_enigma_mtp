import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Step, Mission } from '../../models/activity';
import AdminMissionEditorCard from './AdminMissionEditorCard';

type Props = {
  step: Step;
  stepIndex: number;
  onUpdateStep: (step: Step) => void;
  onRemoveStep: () => void;
  onAddMission: () => void;
  onUpdateMission: (missionIndex: number, mission: Mission) => void;
  onRemoveMission: (missionIndex: number) => void;
  onMissionFocus: (stepIndex: number, missionIndex: number) => void;
  missionCardRefs: React.MutableRefObject<{ [key: string]: View | null }>;
  hapticLight: () => void;
  hapticMedium: () => void;
};

const AdminStepEditor: React.FC<Props> = ({
  step,
  stepIndex,
  onUpdateStep,
  onRemoveStep,
  onAddMission,
  onUpdateMission,
  onRemoveMission,
  onMissionFocus,
  missionCardRefs,
  hapticLight,
  hapticMedium
}) => {
  const handleStepFieldFocus = () => {
    hapticLight();
  };

  return (
    <View 
      className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
    >
      {/* Step Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-900">Step #{stepIndex + 1}</Text>
        <Pressable 
          onPress={() => {
            hapticMedium();
            onRemoveStep();
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Text className="text-red-600 font-semibold">Remove</Text>
        </Pressable>
      </View>

      {/* Step Fields */}
      <View className="mb-4">
        <Text className="text-xs font-semibold mb-1 text-gray-600">Description</Text>
        <TextInput
          value={step.description}
          onChangeText={(text) => onUpdateStep({ ...step, description: text })}
          onFocus={handleStepFieldFocus}
          className="border border-gray-300 rounded px-3 py-2 bg-white"
          placeholder="Step Description"
          multiline
          numberOfLines={2}
          textAlignVertical="top"
        />
      </View>

      {/* Latitude & Longitude & Radius */}
      <View className="flex-row gap-3 mb-4">
        <View className="flex-1">
          <Text className="text-xs font-semibold mb-1 text-gray-600">Latitude</Text>
          <TextInput
            value={String(step.poiLat)}
            onChangeText={(text) => onUpdateStep({ ...step, poiLat: parseFloat(text) || 0 })}
            onFocus={handleStepFieldFocus}
            className="border border-gray-300 rounded px-3 py-2 bg-white"
            placeholder="0.0"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-semibold mb-1 text-gray-600">Longitude</Text>
          <TextInput
            value={String(step.poiLng)}
            onChangeText={(text) => onUpdateStep({ ...step, poiLng: parseFloat(text) || 0 })}
            onFocus={handleStepFieldFocus}
            className="border border-gray-300 rounded px-3 py-2 bg-white"
            placeholder="0.0"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-semibold mb-1 text-gray-600">Radius (m)</Text>
          <TextInput
            value={String(step.radius)}
            onChangeText={(text) => onUpdateStep({ ...step, radius: parseInt(text) || 0 })}
            onFocus={handleStepFieldFocus}
            className="border border-gray-300 rounded px-3 py-2 bg-white"
            placeholder="50"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
      </View>

      {/* Missions Section */}
      <View className="border-t border-gray-300 pt-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-semibold text-gray-900">Missions</Text>
          <Pressable 
            onPress={() => {
              hapticLight();
              onAddMission();
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          >
            <Text className="text-blue-600 text-sm">+ Add Mission</Text>
          </Pressable>
        </View>

        {step.missions.length === 0 ? (
          <View className="py-4 bg-white rounded border border-dashed border-gray-300">
            <Text className="text-gray-400 text-center text-sm">No missions yet</Text>
          </View>
        ) : (
          step.missions.map((mission, missionIndex) => (
            <View
              key={mission.id}
              ref={(ref) => {
                const refKey = `${stepIndex}-${missionIndex}`;
                missionCardRefs.current[refKey] = ref;
              }}
            >
              <AdminMissionEditorCard
                mission={mission}
                missionIndex={missionIndex}
                stepIndex={stepIndex}
                onUpdateMission={(updatedMission) => onUpdateMission(missionIndex, updatedMission)}
                onRemoveMission={() => onRemoveMission(missionIndex)}
                onFocus={() => onMissionFocus(stepIndex, missionIndex)}
                hapticLight={hapticLight}
                hapticMedium={hapticMedium}
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default AdminStepEditor;
