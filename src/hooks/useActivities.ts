import { useCallback } from 'react';
import { Activity } from '../models/activity';
import { useAsyncStorage } from './useAsyncStorage';

const ACTIVITIES_KEY = 'activities';

export const useActivities = () => {
  const { value: activities, setValue, loading, error } = useAsyncStorage<Activity[]>(
    ACTIVITIES_KEY,
    []
  );

  const saveActivity = useCallback(async (activity: Activity, source: 'admin' | 'imported' = 'admin') => {
    const activityWithSource = { ...activity, source };
    const existingIndex = activities.findIndex(a => a.id === activity.id);
    
    if (existingIndex >= 0) {
      const updated = [...activities];
      updated[existingIndex] = activityWithSource;
      await setValue(updated);
    } else {
      await setValue([...activities, activityWithSource]);
    }
  }, [activities, setValue]);

  const deleteActivity = useCallback(async (id: number) => {
    const filtered = activities.filter(a => a.id !== id);
    await setValue(filtered);
  }, [activities, setValue]);

  const getActivity = useCallback((id: number) => {
    return activities.find(a => a.id === id);
  }, [activities]);

  const getAdminActivities = useCallback(() => {
    return activities.filter(a => a.source === 'admin');
  }, [activities]);

  const getImportedActivities = useCallback(() => {
    return activities.filter(a => a.source === 'imported');
  }, [activities]);

  const clearAll = useCallback(async () => {
    await setValue([]);
  }, [setValue]);

  return {
    activities,
    saveActivity,
    deleteActivity,
    getActivity,
    getAdminActivities,
    getImportedActivities,
    clearAll,
    loading,
    error
  };
};
