import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Mission } from '../../models/activity';

type Props = {
  mission: Mission;
  missionIndex: number;
  answer: string;
  onAnswerChange: (text: string) => void;
  feedback: string | null;
  isPhotoMission: boolean;
  onValidate: () => void;
};

const PlayMissionCard: React.FC<Props> = ({
  mission,
  missionIndex,
  answer,
  onAnswerChange,
  feedback,
  isPhotoMission,
  onValidate,
}) => {
  return (
    <View className="bg-gray-50 rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <View className="flex-row items-center mb-4">
        <View className="bg-blue-100 rounded-full px-3 py-1 mr-3">
          <Text className="text-blue-700 font-bold text-xs uppercase">{mission.type}</Text>
        </View>
        <Text className="text-gray-500 text-sm font-medium">Mission {missionIndex + 1}</Text>
      </View>

      <Text className="text-lg text-gray-900 font-semibold mb-6 leading-7">
        {mission.instruction}
      </Text>

      {mission.question && (
        <View className="bg-white p-5 rounded-2xl mb-6 border border-blue-100">
          <Text className="text-blue-700 italic text-base leading-6">
            &ldquo;{mission.question}&rdquo;
          </Text>
        </View>
      )}

      {/* Input Area */}
      {isPhotoMission ? (
        <View className="bg-blue-50 h-48 rounded-2xl items-center justify-center border-2 border-dashed border-blue-300 mb-6">
          <Text className="text-5xl mb-3">📸</Text>
          <Text className="text-blue-700 font-semibold text-base">Prendre une photo</Text>
        </View>
      ) : (
        <View className="mb-6">
          <TextInput
            className="bg-white text-gray-900 p-4 rounded-xl text-base border border-gray-200 focus:border-blue-500"
            placeholder="Votre réponse..."
            placeholderTextColor="#9CA3AF"
            value={answer}
            onChangeText={onAnswerChange}
            onSubmitEditing={onValidate}
          />
        </View>
      )}

      {/* Feedback */}
      {feedback && (
        <View
          className={`p-4 rounded-xl mb-6 ${
            feedback.includes('Correct') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          <Text
            className={`text-center font-semibold text-base ${
              feedback.includes('Correct') ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {feedback}
          </Text>
        </View>
      )}

      {/* Validate Button */}
      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl items-center active:bg-blue-700"
        onPress={onValidate}
      >
        <Text className="text-white font-bold text-lg">{"✓ VALIDER L'ÉTAPE"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayMissionCard;
