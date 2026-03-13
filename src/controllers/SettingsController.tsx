import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SettingsView from '../views/SettingsView';
import { SettingsModel } from '../models/settings';
import { useSettings } from '../hooks/useSettings';
import { useActivities } from '../hooks/useActivities';
import { useProfile } from '../hooks/useProfile';

const SettingsController: React.FC = () => {
  const { settings, saveSettingField } = useSettings();
  const { clearAll: clearActivities } = useActivities();
  const { clearProfile } = useProfile();
  const [editingField, setEditingField] = useState<keyof SettingsModel | null>(null);

  const handleSaveSettings = async (fieldKey: keyof SettingsModel, value: string) => {
    await saveSettingField(fieldKey, value);
    setEditingField(null);
  };

  const handleClearStorage = () => {
    Alert.alert(
      'Effacer le stockage',
      'Cela va supprimer toutes les activités importées et réinitialiser votre profil. Êtes-vous sûr ?',
      [
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Effacer',
          onPress: async () => {
            try {
              await clearActivities();
              await clearProfile?.();
              Alert.alert('Succès', 'Le stockage a été effacé avec succès.');
            } catch (error) {
              Alert.alert('Erreur', "Une erreur est survenue lors de l'effacement du stockage.");
              console.error('Clear storage error:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <>
      <SettingsView
        settings={settings}
        editingField={editingField}
        setEditingField={setEditingField}
        handleUpdateField={handleSaveSettings}
        onClearStorage={handleClearStorage}
      />
      <StatusBar style="dark" />
    </>
  );
};

export default SettingsController;
