import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfileView from '../views/ProfileView';
import { ProfileModel, getProfile } from '../models/profile';


const ProfileController: React.FC = () => {
    const [profile, setProfile] = useState<ProfileModel | null>(null);
    useEffect(() => {
        const profileData = getProfile();
        setProfile(profileData);
    }, [])
    
    return(
        <SafeAreaProvider>
            <ProfileView profile={profile}/>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
};

export default ProfileController;