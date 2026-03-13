import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileModel } from '../models/profile';
import { profileFields } from '../components/profileFields';
import { useAppNavigation } from '../navigation/StackNavigator';

type Props = {
  profile: ProfileModel | null;
  editingField: keyof ProfileModel | null;
  setEditingField: (field: keyof ProfileModel | null) => void;
  handleUpdateField: (fieldKey: keyof ProfileModel, value: string | number) => void;
};

const ProfileView: React.FC<Props> = ({
  profile,
  editingField,
  setEditingField,
  handleUpdateField,
}) => {
  const [tempValue, setTempValue] = useState('');
  const { navigate, goBack, canGoBack } = useAppNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={90}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
            {canGoBack ? (
              <TouchableOpacity onPress={goBack}>
                <Text className="text-2xl">←</Text>
              </TouchableOpacity>
            ) : (
              <View className="w-8" />
            )}
            <View className="flex-1 items-center">
              <Text className="text-2xl font-extrabold text-gray-900">Profil utilisateur</Text>
            </View>
            <TouchableOpacity onPress={() => navigate('Settings')}>
              <Text className="text-2xl">⚙️</Text>
            </TouchableOpacity>
          </View>

          {!profile ? (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-gray-500">Chargement...</Text>
            </View>
          ) : (
            <>
              {/* Profile Picture */}
              <View className="mb-8 mt-8 items-center">
                <Image
                  source={{ uri: profile.profile_pic_url }}
                  className="h-32 w-32 rounded-full bg-gray-200"
                  onError={() => console.warn('Image non chargée')}
                />
              </View>

              {/* Stats Cards */}
              <View className="mb-8 px-5">
                {/* First Row - Level and XP */}
                <View className="mb-3 flex-row gap-3">
                  {/* Level Card */}
                  <View className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <Text className="mb-1 text-xs font-semibold uppercase text-gray-500">
                      Niveau
                    </Text>
                    <Text className="text-3xl font-extrabold text-blue-600">{profile.level}</Text>
                  </View>

                  {/* XP Card */}
                  <View className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <Text className="mb-1 text-xs font-semibold uppercase text-gray-500">
                      Expérience
                    </Text>
                    <Text className="text-2xl font-bold text-gray-900">{profile.xp}</Text>
                    <Text className="text-xs text-gray-400">XP</Text>
                  </View>
                </View>

                {/* Completed Activities Card */}
                <View className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <Text className="mb-1 text-xs font-semibold uppercase text-gray-500">
                    Activités complétées
                  </Text>
                  <Text className="text-2xl font-bold text-gray-900">
                    {profile.completedActivityIds.length}
                  </Text>
                </View>
              </View>

              {/* Editable Profile Fields */}
              <View className="space-y-4 px-5">
                <Text className="mb-4 text-lg font-bold text-gray-900">
                  Informations personnelles
                </Text>
                {profileFields.map((profileField) => (
                  <View
                    key={profileField.key}
                    className="rounded-xl border border-gray-100 bg-white p-4">
                    <View className="mb-2 flex-row items-center justify-between">
                      <Text className="text-sm font-semibold uppercase text-gray-500">
                        {profileField.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setTempValue(String(profile[profileField.key]));
                          setEditingField(
                            editingField === profileField.key ? null : profileField.key
                          );
                        }}>
                        <Text className="text-lg">✏️</Text>
                      </TouchableOpacity>
                    </View>

                    {editingField === profileField.key ? (
                      <TextInput
                        className="rounded-lg border border-blue-300 px-3 py-2 text-gray-900"
                        value={tempValue}
                        onChangeText={setTempValue}
                        returnKeyType="done"
                        placeholderTextColor="#9CA3AF"
                        onSubmitEditing={() => {
                          handleUpdateField(profileField.key, tempValue);
                          setEditingField(null);
                        }}
                      />
                    ) : (
                      <Text className="font-medium text-gray-900">{profile[profileField.key]}</Text>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileView;
