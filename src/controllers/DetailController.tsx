import React from 'react';
import { Text, View } from 'react-native';
import ActivityDetails from '@/views/ActivityDetails';
import { useAppNavigation } from '../navigation/StackNavigator';
import { Activity } from '../models/activity';

const DetailController: React.FC = () => {
  const { params } = useAppNavigation();
  const activity = params?.activity as Activity;

  if (!activity) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Activité non trouvée</Text>
      </View>
    );
  }

  return <ActivityDetails activity={activity} />;
};

export default DetailController;
