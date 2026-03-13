import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  canGoBack: boolean;
  onGoBack: () => void;
};

const AdminHeader: React.FC<Props> = ({ canGoBack, onGoBack }) => {
  return (
    <View className="flex-row items-center border-b border-gray-200 px-4 py-3">
      {canGoBack ? (
        <TouchableOpacity onPress={onGoBack}>
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}
      <View className="flex-1 items-center">
        <Text className="text-3xl font-bold text-gray-900">Admin</Text>
      </View>
      <View className="w-8" />
    </View>
  );
};

export default AdminHeader;
