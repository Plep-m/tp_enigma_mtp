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
        .filter((s) => s.poiLat && s.poiLng)
        .map((s) => ({
          latitude: s.poiLat,
          longitude: s.poiLng,
        }))
    : [];

  const handlePlay = () => {
    navigate('Play', { activity, stepIndex: 0 });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative h-64 w-full bg-gray-200">
          <Image source={{ uri: activity.image }} className="h-full w-full" resizeMode="cover" />
          <TouchableOpacity
            onPress={goBack}
            className="absolute left-4 top-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
            <Text className="text-xl font-bold text-black">←</Text>
          </TouchableOpacity>
        </View>

        <View className="-mt-6 rounded-t-[32px] bg-white px-5 py-6">
          <Text className="mb-2 text-2xl font-bold text-gray-900">{activity.title}</Text>

          <View className="mb-6 flex-row space-x-4">
            <View className="mr-2 rounded-full bg-blue-50 px-3 py-1">
              <Text className="text-xs font-medium text-blue-700">
                ⏱ {activity.duration || '30 min'}
              </Text>
            </View>
            <View className="rounded-full bg-purple-50 px-3 py-1">
              <Text className="text-xs font-medium text-purple-700">
                📊 Niveau {activity.level || 1}
              </Text>
            </View>
          </View>

          <Text className="mb-8 text-base leading-6 text-gray-600">{activity.description}</Text>

          <Text className="mb-4 text-xl font-bold text-gray-900">
            Étapes ({activity.steps?.length || 0})
          </Text>
          <View className="mb-8 space-y-4">
            {activity.steps?.map((step, index) => (
              <View
                key={step.id}
                className="mb-2 flex-row items-start rounded-xl border border-gray-100 bg-gray-50 p-4">
                <View className="mr-3 mt-1 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Text className="font-bold text-blue-600">{index + 1}</Text>
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium text-gray-800">{step.description}</Text>
                  <Text className="text-xs text-gray-500">
                    {step.missions?.length || 0} mission(s)
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {waypoints.length > 0 && (
            <View className="mb-24">
              <Text className="mb-4 text-xl font-bold text-gray-900">Carte</Text>
              <MapCard waypoints={waypoints} />
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white/80 p-5 pt-2">
        <TouchableOpacity
          onPress={handlePlay}
          className="w-full items-center rounded-2xl bg-green-500 py-4 shadow-lg active:bg-green-600">
          <Text className="text-lg font-bold text-white">{"▶  COMMENCER L'AVENTURE"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActivityDetails;
