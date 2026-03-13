import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenModel } from '../models/screen';

type Props = { model: ScreenModel };

const ScreenView: React.FC<Props> = ({ model }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="mb-4 text-3xl font-bold text-gray-900">{model.title}</Text>
        <View className="my-6 h-[1px] w-4/5 bg-gray-300" />
        <View className="mx-8 items-center">
          <Text className="mb-4 text-center text-lg leading-6 text-gray-700">
            Open up the code for this screen: hehe
          </Text>
          <View className="my-2 rounded-lg bg-gray-100 px-4 py-2">
            <Text className="font-mono text-sm text-gray-900">{model.path}</Text>
          </View>
          <Text className="mt-4 text-center text-base leading-6 text-gray-600">
            Change any of the text, save the file, and your app will automatically update.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenView;
