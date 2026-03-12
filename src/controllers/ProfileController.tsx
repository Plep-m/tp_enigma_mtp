import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import ProfileView from '../views/ProfileView';
import { ProfileModel, getProfile } from '../models/profile';


const ProfileController: React.FC = () => {
    const [profile, setProfile] = useState<ProfileModel | null>(null);
    const [editingField, setEditingField] = useState<keyof ProfileModel | null>(null);
    useEffect(() => {
        const profileData = getProfile();
        setProfile(profileData);
    }, [])

    const handleUpdateField = (fieldKey: keyof ProfileModel, value: string | number) => {
        if(!profile) return;
        setProfile({
            ...profile,
            [fieldKey]: value
        });
        setEditingField(null);
    };
    
    return(
        <>
            <ProfileView
            profile={profile}
            editingField={editingField}
            setEditingField={setEditingField}
            handleUpdateField={handleUpdateField}
            />
            <StatusBar style="dark" />
        </>
    );
};

export default ProfileController;