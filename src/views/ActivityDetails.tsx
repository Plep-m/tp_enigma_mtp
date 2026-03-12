import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppNavigation } from '../navigation/StackNavigator';
import MapCard from '../components/MapCard';
import { Coordinate } from '../models/map';
import { Activity } from '../models/activity';

type Props = {
  activity: Activity;
};

const ActivityDetails: React.FC<Props> = ({ activity }) => {
  const { goBack, navigate } = useAppNavigation();

  const waypoints: Coordinate[] = activity.steps
    ? activity.steps
        .filter(s => s.poiLat && s.poiLng)
        .map(s => ({
          latitude: s.poiLat,
          longitude: s.poiLng
        }))
    : [];

  const handlePlay = () => {
    navigate('Play', { activity, stepIndex: 0 });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative h-64 w-full bg-gray-200">
          <Image 
            source={{ uri: activity.image }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity 
            onPress={goBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow-md z-10"
          >
            <Text className="text-xl font-bold text-black">←</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 py-6 -mt-6 bg-white rounded-t-[32px]">
          <Text className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</Text>
          
          <View className="flex-row mb-6 space-x-4">
             <View className="bg-blue-50 px-3 py-1 rounded-full mr-2">
                <Text className="text-blue-700 font-medium text-xs">⏱ {activity.duration || '30 min'}</Text>
             </View>
             <View className="bg-purple-50 px-3 py-1 rounded-full">
                <Text className="text-purple-700 font-medium text-xs">📊 Niveau {activity.level || 1}</Text>
             </View>
          </View>

          <Text className="text-gray-600 leading-6 mb-8 text-base">
            {activity.description}
          </Text>

          <Text className="text-xl font-bold text-gray-900 mb-4">Étapes ({activity.steps?.length || 0})</Text>
          <View className="mb-8 space-y-4">
            {activity.steps?.map((step, index) => (
                <View key={step.id} className="flex-row items-start p-4 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                    <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                        <Text className="text-blue-600 font-bold">{index + 1}</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-800 font-medium mb-1">{step.description}</Text>
                        <Text className="text-xs text-gray-500">{step.missions?.length || 0} mission(s)</Text>
                    </View>
                </View>
            ))}
          </View>

          {waypoints.length > 0 && (
            <View className="mb-24">
              <Text className="text-xl font-bold text-gray-900 mb-4">Carte</Text>
              <MapCard waypoints={waypoints} />
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 pt-2">
        <TouchableOpacity 
            onPress={handlePlay}
            className="w-full bg-green-500 py-4 rounded-2xl shadow-lg items-center active:bg-green-600"
        >
            <Text className="text-white font-bold text-lg">{"▶  COMMENCER L'AVENTURE"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActivityDetails;
