import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SettingsView from '../views/SettingsView';
import { SettingsModel, getSettings } from '../models/settings';

const SettingsController: React.FC = () => {
    const [settings, setSettings] = useState<SettingsModel | null>(null);
    useEffect(() => {
        const settingsData = getSettings();
        setSettings(settingsData);
    }, [])

    return (
        <SafeAreaProvider>
            <SettingsView settings={settings}/>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
};

export default SettingsController;