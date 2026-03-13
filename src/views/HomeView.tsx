import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppNavigation } from '../navigation/StackNavigator';
import { activities as initialActivities } from '../data/activities';
import { Activity } from '../models/activity';
import { useProfile } from '../hooks/useProfile';
import { useActivities } from '../hooks/useActivities';
import { decodeActivity } from '../models/qrcode';
import QRScanner from '../components/QRScanner';

const HomeView: React.FC = () => {
  const { navigate } = useAppNavigation();
  const { profile } = useProfile();
  const {
    activities: storedActivities,
    saveActivity,
    loading: activitiesLoading,
  } = useActivities();
  const [activitiesList, setActivitiesList] = useState<Activity[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeActivities = async () => {
      if (!activitiesLoading && !isInitialized) {
        for (const activity of initialActivities) {
          await saveActivity(activity, 'admin');
        }
        setIsInitialized(true);
      }
    };

    initializeActivities();
  }, [activitiesLoading, isInitialized, saveActivity]);

  useEffect(() => {
    if (storedActivities && storedActivities.length > 0) {
      setActivitiesList(storedActivities);
    }
  }, [storedActivities]);

  const handleCardPress = (activity: Activity) => {
    navigate('Detail', { activity });
  };

  const handleScan = async (data: string) => {
    setIsScannerOpen(false);
    try {
      if (data.startsWith('activity:')) {
        const id = parseInt(data.split(':')[1]);
        const activity = activitiesList.find((a) => a.id === id);
        if (activity) {
          navigate('Detail', { activity });
        } else {
          alert('Activité non trouvée !');
        }
      } else {
        const importedActivity = decodeActivity<Activity>(data);
        await saveActivity(importedActivity, 'imported');
        alert(`Activité "${importedActivity.title}" importée avec succès !`);
      }
    } catch (error) {
      alert('Erreur de lecture du QR Code');
      console.error('QR decode error:', error);
    }
  };

  const renderActivityCard = ({ item }: { item: Activity }) => (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      onPress={() => handleCardPress(item)}
      activeOpacity={0.9}>
      <View className="h-40 w-full bg-gray-200">
        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1">
          <Text className="text-xs font-bold text-gray-800">{item.category || 'Aventure'}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="flex-1 text-lg font-bold text-gray-900">{item.title}</Text>
          {profile?.completedActivityIds?.includes(item.id) && (
            <Text className="text-xs font-bold text-green-600">✓ Complété</Text>
          )}
        </View>
        <Text className="mb-3 text-sm text-gray-500" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text className="text-xs text-gray-400">⏱ {item.duration || '30m'}</Text>
            <Text className="text-xs text-gray-400">📊 Niv. {item.level || 1}</Text>
          </View>
          <Text className="text-sm font-semibold text-blue-600">Voir →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      <View className="border-b border-gray-100 bg-white px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-extrabold text-gray-900">Enigma MTP</Text>
            <Text className="text-sm text-gray-500">
              {profile ? `Niveau ${profile.level || 1} • ${profile.xp || 0} XP` : 'Chargement...'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsScannerOpen(true)}
            className="h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg">
            <Text className="text-xl text-white">📷</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => navigate('Profile')}
            className="flex-1 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
            <Text className="text-sm font-semibold text-blue-600">👤 Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('Admin')}
            className="flex-1 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 px-3 py-2">
            <Text className="text-sm font-semibold text-gray-700">⚙️ Administration</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={activitiesList}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text className="mb-4 text-lg font-bold text-gray-800">Activités disponibles</Text>
        }
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-500">Aucune activité disponible.</Text>
        }
      />

      <Modal visible={isScannerOpen} animationType="slide" presentationStyle="fullScreen">
        <QRScanner onScan={handleScan} onClose={() => setIsScannerOpen(false)} />
      </Modal>
    </SafeAreaView>
  );
};

export default HomeView;
