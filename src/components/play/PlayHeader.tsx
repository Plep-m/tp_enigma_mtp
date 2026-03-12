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
    <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
      <TouchableOpacity onPress={goBack} className="active:opacity-70">
        <Text className="text-gray-700 text-lg font-semibold">← Retour</Text>
      </TouchableOpacity>
      <View className="bg-blue-50 px-3 py-1 rounded-full">
        <Text className="text-blue-700 font-bold text-sm">
          Étape {stepIndex + 1} / {totalSteps}
        </Text>
      </View>
      <TouchableOpacity onPress={onDrawerOpen} className="active:opacity-70">
        <Text className="text-blue-600 font-semibold text-sm">📋 Itinéraire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayHeader;
