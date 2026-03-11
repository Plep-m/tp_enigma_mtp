import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfileView from '../views/ProfileView';

const ProfileController: React.FC = () => {
    return(
        <SafeAreaProvider>
            <ProfileView />
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
};

export default ProfileController;