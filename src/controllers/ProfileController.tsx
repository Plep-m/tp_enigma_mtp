import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import ProfileView from '../views/ProfileView';
import { ProfileModel } from '../models/profile';
import { useProfile } from '../hooks/useProfile';
import { useStats } from '../hooks/useStats';

const ProfileController: React.FC = () => {
  const { profile, saveProfileField } = useProfile();
  const { stats } = useStats();
  const [editingField, setEditingField] = useState<keyof ProfileModel | null>(null);

  const handleSaveProfile = async (fieldKey: keyof ProfileModel, value: string | number) => {
    await saveProfileField(fieldKey, value);
    setEditingField(null);
  };

  const statVisitedLocations = stats?.visitedLocations ?? 0;
  const statRealizedActivities = stats?.RealizedActivities ?? 0;
  const maxKmDistanceTraveled = stats?.maxKmDistanceTraveled ?? 0;
  const statLongestDistanceTraveled = stats 
    ? `${stats.itineraryMaxDistanceTraveled} (${maxKmDistanceTraveled} km)` 
    : 'N/A';
  const statScoreLocationsRank = stats?.scoreLocationsRank ?? [];

  return (
    <>
      <ProfileView
        profile={profile}
        editingField={editingField}
        setEditingField={setEditingField}
        handleUpdateField={handleSaveProfile}
        statVisitedLocations={statVisitedLocations}
        statRealizedActivities={statRealizedActivities}
        statLongestDistanceTraveled={statLongestDistanceTraveled}
        statScoreLocationsRank={statScoreLocationsRank}
      />
      <StatusBar style="dark" />
    </>
  );
};

export default ProfileController;
