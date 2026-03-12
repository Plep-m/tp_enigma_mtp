import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import SettingsView from '../views/SettingsView';
import { SettingsModel, getSettings } from '../models/settings';

const SettingsController: React.FC = () => {
    const [settings, setSettings] = useState<SettingsModel | null>(null);
    const [editingField, setEditingField] = useState<keyof SettingsModel | null>(null);
    useEffect(() => {
        const settingsData = getSettings();
        setSettings(settingsData);
    }, [])

    const handleUpdateField = (fieldKey: keyof SettingsModel, value: string) => {
        if(!settings) return;
        setSettings({
            ...settings,
            [fieldKey]: value
        });
        setEditingField(null);
    };

    return (
        <>
            <SettingsView
            settings={settings}
            editingField={editingField}
            setEditingField={setEditingField}
            handleUpdateField={handleUpdateField}
            />
            <StatusBar style="dark" />
        </>
    );
};

export default SettingsController;