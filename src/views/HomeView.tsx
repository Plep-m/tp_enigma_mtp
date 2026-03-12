import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppNavigation } from '../navigation/StackNavigator';
import { activities as initialActivities } from '../data/activities';
import { Activity } from '../models/activity';
import { useProfile } from '../hooks/useProfile';
import QRScanner from '../components/QRScanner';

const HomeView: React.FC = () => {
  const { navigate } = useAppNavigation();
  const { profile } = useProfile();
  const [activitiesList, setActivitiesList] = useState<Activity[]>(initialActivities);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  useEffect(() => {
    setActivitiesList(initialActivities);
  }, []);

  const handleCardPress = (activity: Activity) => {
    navigate('Detail', { activity });
  };

  const handleScan = (data: string) => {
    setIsScannerOpen(false);
    try {
        if (data.startsWith("activity:")) {
            const id = parseInt(data.split(":")[1]);
            const activity = activitiesList.find(a => a.id === id);
            if (activity) {
                navigate('Detail', { activity });
            } else {
                alert("Activité non trouvée !");
            }
        } else {
            alert(`Code scanné : ${data}`);
        }
    } catch {
        alert("Erreur de lecture du QR Code");
    }
  };

  const renderActivityCard = ({ item }: { item: Activity }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden"
      onPress={() => handleCardPress(item)}
      activeOpacity={0.9}
    >
      <View className="h-40 w-full bg-gray-200">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full">
            <Text className="text-xs font-bold text-gray-800">{item.category || 'Aventure'}</Text>
        </View>
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-1">
            <Text className="text-lg font-bold text-gray-900 flex-1">{item.title}</Text>
            {profile?.completedActivityIds?.includes(item.id) && (
                <Text className="text-green-600 text-xs font-bold">✓ Complété</Text>
            )}
        </View>
        <Text className="text-gray-500 text-sm mb-3" numberOfLines={2}>{item.description}</Text>
        
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2">
                <Text className="text-xs text-gray-400">⏱ {item.duration || '30m'}</Text>
                <Text className="text-xs text-gray-400">📊 Niv. {item.level || 1}</Text>
            </View>
            <Text className="text-blue-600 font-semibold text-sm">Voir →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      <View className="px-5 py-4 bg-white border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-1">
              <Text className="text-2xl font-extrabold text-gray-900">Enigma MTP</Text>
              <Text className="text-sm text-gray-500">
                  {profile ? `Niveau ${profile.level || 1} • ${profile.xp || 0} XP` : 'Chargement...'}
              </Text>
          </View>
          <TouchableOpacity 
              onPress={() => setIsScannerOpen(true)}
              className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-lg"
          >
              <Text className="text-white text-xl">📷</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity 
              onPress={() => navigate('Profile')}
              className="flex-1 bg-blue-50 border border-blue-200 rounded-lg py-2 px-3 items-center justify-center"
          >
              <Text className="text-blue-600 font-semibold text-sm">👤 Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={() => navigate('Admin')}
              className="flex-1 bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 items-center justify-center"
          >
              <Text className="text-gray-700 font-semibold text-sm">⚙️ Administration</Text>
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
            <Text className="text-lg font-bold text-gray-800 mb-4">Activités disponibles</Text>
        }
        ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">Aucune activité disponible.</Text>
        }
      />

      <Modal
        visible={isScannerOpen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <QRScanner 
            onScan={handleScan} 
            onClose={() => setIsScannerOpen(false)} 
        />
      </Modal>
    </SafeAreaView>
  );
};

export default HomeView;
