import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsModel } from '../models/settings';
import { settingsFields } from "../components/settingsFields";
import { useAppNavigation } from "../navigation/StackNavigator";

type Props = {
  settings: SettingsModel | null;
  editingField: keyof SettingsModel | null;
  setEditingField: (field: keyof SettingsModel | null) => void;
  handleUpdateField: (fieldKey: keyof SettingsModel, value: string) => void;
};

const SettingsView: React.FC<Props> = ({ settings, editingField, setEditingField, handleUpdateField }) => {
  const [tempValue, setTempValue] = useState("");
  const { goBack, canGoBack } = useAppNavigation();

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
              <Text className="text-2xl font-extrabold text-gray-900">Paramètres</Text>
            </View>
            <View className="w-8" />
          </View>

          {!settings ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500">Chargement...</Text>
            </View>
          ) : (
            <>
              {/* Settings Fields */}
              <View className="px-5 py-6 space-y-4">
                <Text className="text-lg font-bold text-gray-900 mb-4">{"Préférences de l'application"}</Text>
                {settingsFields.map((settingsField) => (
                  <View key={settingsField.key} className="bg-white rounded-xl p-4 border border-gray-100">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm text-gray-500 font-semibold uppercase">{settingsField.label}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setTempValue(String(settings[settingsField.key]));
                          setEditingField(editingField === settingsField.key ? null : settingsField.key);
                        }}
                      >
                        <Text className="text-lg">✏️</Text>
                      </TouchableOpacity>
                    </View>

                    {editingField === settingsField.key ? (
                      <TextInput
                        className="border border-blue-300 rounded-lg px-3 py-2 text-gray-900"
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
                      <Text className="text-gray-900 font-medium">{settings[settingsField.key]}</Text>
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

export default SettingsView;
