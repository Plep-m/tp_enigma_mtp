import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppNavigation } from '../../navigation/StackNavigator';

type Props = {
  stepIndex: number;
  totalSteps: number;
  onDrawerOpen: () => void;
};

const PlayHeader: React.FC<Props> = ({ stepIndex, totalSteps, onDrawerOpen }) => {
  const { goBack } = useAppNavigation();

  return (
    <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
      <TouchableOpacity onPress={goBack} className="active:opacity-70">
        <Text className="text-lg font-semibold text-gray-700">← Retour</Text>
      </TouchableOpacity>
      <View className="rounded-full bg-blue-50 px-3 py-1">
        <Text className="text-sm font-bold text-blue-700">
          Étape {stepIndex + 1} / {totalSteps}
        </Text>
      </View>
      <TouchableOpacity onPress={onDrawerOpen} className="active:opacity-70">
        <Text className="text-sm font-semibold text-blue-600">📋 Itinéraire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayHeader;
