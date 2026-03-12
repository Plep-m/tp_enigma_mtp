import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import SettingsView from '../views/SettingsView';
import { SettingsModel } from '../models/settings';
import { useSettings } from '../hooks/useSettings';

const SettingsController: React.FC = () => {
    const { settings, saveSettingField } = useSettings();
    const [editingField, setEditingField] = useState<keyof SettingsModel | null>(null);
    
    const handleSaveSettings = async (fieldKey: keyof SettingsModel, value: string) => {
        await saveSettingField(fieldKey, value);
        setEditingField(null);
    };

    return (
        <>
            <SettingsView
            settings={settings}
            editingField={editingField}
            setEditingField={setEditingField}
            handleUpdateField={handleSaveSettings}
            />
            <StatusBar style="dark" />
        </>
    );
};

export default SettingsController;