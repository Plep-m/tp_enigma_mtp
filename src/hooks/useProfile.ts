import { useCallback } from 'react';
import { ProfileModel } from '../models/profile';
import { useAsyncStorage, } from './useAsyncStorage';
import profileData from '../data/profile.json';

const PROFILE_KEY = 'profile';

export const useProfile = () => {
  const { value: profile, setValue: setProfile, loading, error } = useAsyncStorage<ProfileModel>(
    PROFILE_KEY, profileData
  );
  
  const saveProfileField = useCallback(async(profileFieldKey: keyof ProfileModel, value: string | number) => {
    if(!profile) return;
    const savedProfile: ProfileModel = {
        ...profile,
        [profileFieldKey] : value,
    };
    await setProfile(savedProfile);
    },
      [profile, setProfile]
    );

  return {
    profile,
    loading,
    error,
    saveProfileField
  };
};
