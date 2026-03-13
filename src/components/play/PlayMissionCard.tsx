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
    <View className="mb-6 rounded-3xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 rounded-full bg-blue-100 px-3 py-1">
          <Text className="text-xs font-bold uppercase text-blue-700">{mission.type}</Text>
        </View>
        <Text className="text-sm font-medium text-gray-500">Mission {missionIndex + 1}</Text>
      </View>

      <Text className="mb-6 text-lg font-semibold leading-7 text-gray-900">
        {mission.instruction}
      </Text>

      {mission.question && (
        <View className="mb-6 rounded-2xl border border-blue-100 bg-white p-5">
          <Text className="text-base italic leading-6 text-blue-700">
            &ldquo;{mission.question}&rdquo;
          </Text>
        </View>
      )}

      {isPhotoMission ? (
        <View className="mb-6 h-48 items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50">
          <Text className="mb-3 text-5xl">📸</Text>
          <Text className="text-base font-semibold text-blue-700">Prendre une photo</Text>
        </View>
      ) : (
        <View className="mb-6">
          <TextInput
            className="rounded-xl border border-gray-200 bg-white p-4 text-base text-gray-900 focus:border-blue-500"
            placeholder="Votre réponse..."
            placeholderTextColor="#9CA3AF"
            value={answer}
            onChangeText={onAnswerChange}
            onSubmitEditing={onValidate}
          />
        </View>
      )}

      {feedback && (
        <View
          className={`mb-6 rounded-xl p-4 ${
            feedback.includes('Correct')
              ? 'border border-green-200 bg-green-50'
              : 'border border-red-200 bg-red-50'
          }`}>
          <Text
            className={`text-center text-base font-semibold ${
              feedback.includes('Correct') ? 'text-green-700' : 'text-red-700'
            }`}>
            {feedback}
          </Text>
        </View>
      )}

      <TouchableOpacity
        className="items-center rounded-xl bg-blue-600 py-4 active:bg-blue-700"
        onPress={onValidate}>
        <Text className="text-lg font-bold text-white">{"✓ VALIDER L'ÉTAPE"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayMissionCard;
