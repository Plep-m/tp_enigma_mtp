import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppNavigation } from '../navigation/_layout';

type NavButton = {
  label: string;
  screen: Parameters<ReturnType<typeof useAppNavigation>['navigate']>[0];
  emoji: string;
};

const buttons: NavButton[] = [
  { label: 'Profil',      screen: 'Profile',  emoji: '👤' },
  { label: 'Admin',       screen: 'Admin',    emoji: '🛠️' },
  { label: 'Map',         screen: 'Map',      emoji: '🛠️' },
];

const TempHomeView: React.FC = () => {
  const { navigate } = useAppNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-200 items-center">
        <Text className="text-3xl font-bold text-gray-900">Accueil</Text>
      </View>

      {/* Nav buttons */}
      <View className="flex-1 justify-center px-6 gap-y-4">
        {buttons.map(({ label, screen, emoji }) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigate(screen)}
            className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 active:bg-gray-100"
          >
            <Text className="text-2xl mr-4">{emoji}</Text>
            <Text className="text-lg font-medium text-gray-800">{label}</Text>
            <Text className="ml-auto text-gray-400 text-xl">›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TempHomeView;
