import { useCallback } from 'react';
import { ProfileModel } from '../models/profile';
import { useAsyncStorage } from './useAsyncStorage';
import profileData from '../data/profile.json';

const PROFILE_KEY = 'profile';

export const useProfile = () => {
  const {
    value: profile,
    setValue: setProfile,
    loading,
    error,
  } = useAsyncStorage<ProfileModel>(PROFILE_KEY, profileData);

  const saveProfileField = useCallback(
    async (profileFieldKey: keyof ProfileModel, value: string | number | number[]) => {
      if (!profile) return;
      const savedProfile: ProfileModel = {
        ...profile,
        [profileFieldKey]: value,
      };
      await setProfile(savedProfile);
    },
    [profile, setProfile]
  );

  const addXp = useCallback(
    async (amount: number) => {
      if (!profile) return;
      const newXp = profile.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      const updatedProfile: ProfileModel = {
        ...profile,
        xp: newXp,
        level: newLevel,
      };
      await setProfile(updatedProfile);
    },
    [profile, setProfile]
  );

  const completeActivity = useCallback(
    async (activityId: number) => {
      if (!profile) return;
      if (!profile.completedActivityIds.includes(activityId)) {
        const updatedProfile: ProfileModel = {
          ...profile,
          completedActivityIds: [...profile.completedActivityIds, activityId],
        };
        await setProfile(updatedProfile);
      }
    },
    [profile, setProfile]
  );

  const clearProfile = useCallback(async () => {
    await setProfile(profileData);
  }, [setProfile]);

  return {
    profile,
    loading,
    error,
    saveProfileField,
    addXp,
    completeActivity,
    clearProfile,
  };
};
