import { useCallback } from 'react';
import { SettingsModel } from '../models/settings';
import { useAsyncStorage, } from './useAsyncStorage';
import settingsData from '../data/settings.json';

const SETTINGS_KEY = 'settings';

export const useSettings = () => {
  const { value: settings, setValue: setSettings, loading, error } = useAsyncStorage<SettingsModel>(
    SETTINGS_KEY, settingsData
  );
  
  const saveSettingField = useCallback(async(settingFieldKey: keyof SettingsModel, value: string) => {
    if(!settings) return;
    const savedSettings: SettingsModel = {
        ...settings,
        [settingFieldKey] : value,
    };
    await setSettings(savedSettings);
    },
      [settings, setSettings]
    );

  return {
    settings,
    loading,
    error,
    saveSettingField
  };
};
