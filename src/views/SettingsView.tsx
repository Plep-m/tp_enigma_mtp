import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsModel } from '../models/settings';
import { settingsFields } from '../components/settingsFields';
import { useAppNavigation } from '../navigation/StackNavigator';

type Props = {
  settings: SettingsModel | null;
  editingField: keyof SettingsModel | null;
  setEditingField: (field: keyof SettingsModel | null) => void;
  handleUpdateField: (fieldKey: keyof SettingsModel, value: string) => void;
  onClearStorage: () => void;
};

const SettingsView: React.FC<Props> = ({
  settings,
  editingField,
  setEditingField,
  handleUpdateField,
  onClearStorage,
}) => {
  const [tempValue, setTempValue] = useState('');
  const { goBack, canGoBack } = useAppNavigation();

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
              <Text className="text-2xl font-extrabold text-gray-900">Paramètres</Text>
            </View>
            <View className="w-8" />
          </View>

          {!settings ? (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-gray-500">Chargement...</Text>
            </View>
          ) : (
            <>
              <View className="space-y-4 px-5 py-6">
                <Text className="mb-4 text-lg font-bold text-gray-900">
                  {"Préférences de l'application"}
                </Text>
                {settingsFields.map((settingsField) => (
                  <View
                    key={settingsField.key}
                    className="rounded-xl border border-gray-100 bg-white p-4">
                    <View className="mb-2 flex-row items-center justify-between">
                      <Text className="text-sm font-semibold uppercase text-gray-500">
                        {settingsField.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setTempValue(String(settings[settingsField.key]));
                          setEditingField(
                            editingField === settingsField.key ? null : settingsField.key
                          );
                        }}>
                        <Text className="text-lg">✏️</Text>
                      </TouchableOpacity>
                    </View>

                    {editingField === settingsField.key ? (
                      <TextInput
                        className="rounded-lg border border-blue-300 px-3 py-2 text-gray-900"
                        value={tempValue}
                        onChangeText={setTempValue}
                        returnKeyType="done"
                        placeholderTextColor="#9CA3AF"
                        onSubmitEditing={() => {
                          handleUpdateField(settingsField.key, tempValue);
                          setEditingField(null);
                        }}
                      />
                    ) : (
                      <Text className="font-medium text-gray-900">
                        {settings[settingsField.key]}
                      </Text>
                    )}
                  </View>
                ))}

                <View className="mt-8 rounded-xl border border-red-100 bg-red-50 p-4">
                  <Text className="mb-4 text-sm font-semibold uppercase text-red-600">
                    Gestion du stockage
                  </Text>
                  <TouchableOpacity
                    onPress={onClearStorage}
                    className="items-center justify-center rounded-lg bg-red-600 px-4 py-3">
                    <Text className="font-semibold text-white">🗑️ Effacer le stockage</Text>
                  </TouchableOpacity>
                  <Text className="mt-3 text-xs text-gray-600">
                    Cela supprimera toutes les activités importées et réinitialisera votre profil.
                  </Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SettingsView;
