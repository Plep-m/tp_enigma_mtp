import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Mission, MissionType } from '../../models/activity';

type Props = {
  mission: Mission;
  missionIndex: number;
  stepIndex: number;
  onUpdateMission: (mission: Mission) => void;
  onRemoveMission: () => void;
  onFocus: () => void;
  hapticLight: () => void;
  hapticMedium: () => void;
};

const AdminMissionEditorCard: React.FC<Props> = ({
  mission,
  missionIndex,
  stepIndex,
  onUpdateMission,
  onRemoveMission,
  onFocus,
  hapticLight,
  hapticMedium
}) => {
  const handleInputFocus = () => {
    hapticLight();
    onFocus();
  };

  return (
    <View 
      className="bg-white border border-gray-200 rounded p-3 mb-3"
    >
      {/* Mission Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-medium text-sm text-gray-700">Mission #{missionIndex + 1}</Text>
        <Pressable 
          onPress={() => {
            hapticMedium();
            onRemoveMission();
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Text className="text-red-600 text-xs">Remove</Text>
        </Pressable>
      </View>

      {/* Mission Type */}
      <View className="mb-3">
        <Text className="text-xs font-semibold mb-1 text-gray-600">Type</Text>
        <TextInput
          value={mission.type}
          onChangeText={(text) => onUpdateMission({ ...mission, type: text as MissionType })}
          onFocus={handleInputFocus}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. photo, quiz, text"
          returnKeyType="next"
        />
      </View>

      {/* Mission Instruction */}
      <View className="mb-3">
        <Text className="text-xs font-semibold mb-1 text-gray-600">Instruction</Text>
        <TextInput
          value={mission.instruction}
          onChangeText={(text) => onUpdateMission({ ...mission, instruction: text })}
          onFocus={handleInputFocus}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Task instructions"
          multiline
          numberOfLines={2}
          textAlignVertical="top"
        />
      </View>

      {/* Mission Question (optional) */}
      <View className="mb-3">
        <Text className="text-xs font-semibold mb-1 text-gray-600">Question (optional)</Text>
        <TextInput
          value={mission.question || ''}
          onChangeText={(text) => onUpdateMission({ ...mission, question: text })}
          onFocus={handleInputFocus}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Question for quiz, etc."
          multiline
          numberOfLines={2}
          textAlignVertical="top"
        />
      </View>

      {/* Mission Expected Answer (optional) */}
      <View>
        <Text className="text-xs font-semibold mb-1 text-gray-600">Expected Answer (optional)</Text>
        <TextInput
          value={mission.expectedAnswer || ''}
          onChangeText={(text) => onUpdateMission({ ...mission, expectedAnswer: text })}
          onFocus={handleInputFocus}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Expected answer"
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

export default AdminMissionEditorCard;
