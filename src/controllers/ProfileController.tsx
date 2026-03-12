import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfileView from '../views/ProfileView';
import { ProfileModel } from '../models/profile';
import { useProfile } from '../hooks/useProfile';


const ProfileController: React.FC = () => {
    const [profile] = useState<ProfileModel | null>(null);
    const [editingField, setEditingField] = useState<keyof ProfileModel | null>(null);
    const { saveProfileField } = useProfile();

    const handleSaveProfile = async (fieldKey: keyof ProfileModel, value: string | number) => {
        await saveProfileField(fieldKey, value);
        setEditingField(null);
    };

    return(
        <SafeAreaProvider>
            <ProfileView 
            profile={profile}
            editingField={editingField}
            setEditingField={setEditingField}
            handleUpdateField={handleSaveProfile}
            />
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
};

export default ProfileController;