import React, { useState } from 'react';
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
  missionCardRefs: React.RefObject<{ [key: string]: View | null }>;
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
  hapticMedium,
}) => {
  const [latInput, setLatInput] = useState(String(step.poiLat));
  const [lngInput, setLngInput] = useState(String(step.poiLng));

  const handleStepFieldFocus = () => {
    hapticLight();
  };

  const handleLatChange = (text: string) => {
    setLatInput(text);
    const normalized = text.replace(',', '.');
    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) {
      onUpdateStep({ ...step, poiLat: parsed });
    }
  };

  const handleLngChange = (text: string) => {
    setLngInput(text);
    const normalized = text.replace(',', '.');
    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) {
      onUpdateStep({ ...step, poiLng: parsed });
    }
  };

  return (
    <View className="mb-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">Step #{stepIndex + 1}</Text>
        <Pressable
          onPress={() => {
            hapticMedium();
            onRemoveStep();
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
          <Text className="font-semibold text-red-600">Remove</Text>
        </Pressable>
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-xs font-semibold text-gray-600">Description</Text>
        <TextInput
          value={step.description}
          onChangeText={(text) => onUpdateStep({ ...step, description: text })}
          onFocus={handleStepFieldFocus}
          className="rounded border border-gray-300 bg-white px-3 py-2"
          placeholder="Step Description"
          multiline
          numberOfLines={2}
          textAlignVertical="top"
        />
      </View>

      <View className="mb-4 flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-1 text-xs font-semibold text-gray-600">Latitude</Text>
          <TextInput
            value={latInput}
            onChangeText={handleLatChange}
            onFocus={handleStepFieldFocus}
            className="rounded border border-gray-300 bg-white px-3 py-2"
            placeholder="0.0"
            returnKeyType="next"
          />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xs font-semibold text-gray-600">Longitude</Text>
          <TextInput
            value={lngInput}
            onChangeText={handleLngChange}
            onFocus={handleStepFieldFocus}
            className="rounded border border-gray-300 bg-white px-3 py-2"
            placeholder="0.0"
            returnKeyType="next"
          />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xs font-semibold text-gray-600">Radius (m)</Text>
          <TextInput
            value={String(step.radius)}
            onChangeText={(text) => onUpdateStep({ ...step, radius: parseInt(text) || 0 })}
            onFocus={handleStepFieldFocus}
            className="rounded border border-gray-300 bg-white px-3 py-2"
            placeholder="50"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
      </View>

      <View className="border-t border-gray-300 pt-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="font-semibold text-gray-900">Missions</Text>
          <Pressable
            onPress={() => {
              hapticLight();
              onAddMission();
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
            <Text className="text-sm text-blue-600">+ Add Mission</Text>
          </Pressable>
        </View>

        {step.missions.length === 0 ? (
          <View className="rounded border border-dashed border-gray-300 bg-white py-4">
            <Text className="text-center text-sm text-gray-400">No missions yet</Text>
          </View>
        ) : (
          step.missions.map((mission, missionIndex) => (
            <View
              key={mission.id}
              ref={(ref) => {
                const refKey = `${stepIndex}-${missionIndex}`;
                missionCardRefs.current[refKey] = ref;
              }}>
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
