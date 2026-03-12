import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileModel } from '../models/profile';
import { profileFields } from "../components/profileFields";
import { useAppNavigation } from "../navigation/StackNavigator";

type Props = {
  profile: ProfileModel | null;
  editingField: keyof ProfileModel | null;
  setEditingField: (field: keyof ProfileModel | null) => void;
  handleUpdateField: (fieldKey: keyof ProfileModel, value: string | number) => void;
};

const ProfileView: React.FC<Props> = ({ profile, editingField, setEditingField, handleUpdateField }) => {
  const [tempValue, setTempValue] = useState("");
  const { navigate, goBack, canGoBack } = useAppNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
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
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500">Chargement...</Text>
            </View>
          ) : (
            <>
              {/* Profile Picture */}
              <View className="mt-8 mb-8 items-center">
                <Image
                  source={{ uri: profile.profile_pic_url }}
                  className="w-32 h-32 rounded-full bg-gray-200"
                  onError={() => console.warn('Image non chargée')}
                />
              </View>

              {/* Stats Cards */}
              <View className="px-5 mb-8">
                {/* First Row - Level and XP */}
                <View className="flex-row gap-3 mb-3">
                  {/* Level Card */}
                  <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <Text className="text-xs text-gray-500 font-semibold uppercase mb-1">Niveau</Text>
                    <Text className="text-3xl font-extrabold text-blue-600">{profile.level}</Text>
                  </View>

                  {/* XP Card */}
                  <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <Text className="text-xs text-gray-500 font-semibold uppercase mb-1">Expérience</Text>
                    <Text className="text-2xl font-bold text-gray-900">{profile.xp}</Text>
                    <Text className="text-xs text-gray-400">XP</Text>
                  </View>
                </View>

                {/* Completed Activities Card */}
                <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <Text className="text-xs text-gray-500 font-semibold uppercase mb-1">Activités complétées</Text>
                  <Text className="text-2xl font-bold text-gray-900">{profile.completedActivityIds.length}</Text>
                </View>
              </View>

              {/* Editable Profile Fields */}
              <View className="px-5 space-y-4">
                <Text className="text-lg font-bold text-gray-900 mb-4">Informations personnelles</Text>
                {profileFields.map((profileField) => (
                  <View key={profileField.key} className="bg-white rounded-xl p-4 border border-gray-100">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm text-gray-500 font-semibold uppercase">{profileField.label}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setTempValue(String(profile[profileField.key]));
                          setEditingField(editingField === profileField.key ? null : profileField.key);
                        }}
                      >
                        <Text className="text-lg">✏️</Text>
                      </TouchableOpacity>
                    </View>

                    {editingField === profileField.key ? (
                      <TextInput
                        className="border border-blue-300 rounded-lg px-3 py-2 text-gray-900"
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
                      <Text className="text-gray-900 font-medium">{profile[profileField.key]}</Text>
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