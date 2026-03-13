import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import ProfileView from '../views/ProfileView';
import { ProfileModel } from '../models/profile';
import { useProfile } from '../hooks/useProfile';

const ProfileController: React.FC = () => {
  const { profile, saveProfileField } = useProfile();
  const [editingField, setEditingField] = useState<keyof ProfileModel | null>(null);

  const handleSaveProfile = async (fieldKey: keyof ProfileModel, value: string | number) => {
    await saveProfileField(fieldKey, value);
    setEditingField(null);
  };

  return (
    <>
      <ProfileView
        profile={profile}
        editingField={editingField}
        setEditingField={setEditingField}
        handleUpdateField={handleSaveProfile}
      />
      <StatusBar style="dark" />
    </>
  );
};

export default ProfileController;
