import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenModel } from '../models/screen';

type Props = { model: ScreenModel };

const ScreenView: React.FC<Props> = ({ model }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-3xl font-bold text-gray-900 mb-4">{model.title}</Text>
        <View className="h-[1px] w-4/5 bg-gray-300 my-6" />
        <View className="items-center mx-8">
          <Text className="text-lg leading-6 text-center text-gray-700 mb-4">
            Open up the code for this screen: hehe
          </Text>
          <View className="bg-gray-100 rounded-lg px-4 py-2 my-2">
            <Text className="font-mono text-sm text-gray-900">{model.path}</Text>
          </View>
          <Text className="text-base leading-6 text-center text-gray-600 mt-4">
            Change any of the text, save the file, and your app will automatically update.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenView;
