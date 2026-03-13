import { useCallback } from 'react';
import { Activity } from '../models/activity';
import { useAsyncStorage } from './useAsyncStorage';

const ACTIVITIES_KEY = 'activities';

export const useActivities = () => {
  const {
    value: activities,
    setValue,
    loading,
    error,
  } = useAsyncStorage<Activity[]>(ACTIVITIES_KEY, []);

  const saveActivity = useCallback(
    async (activity: Activity, source: 'admin' | 'imported' = 'admin') => {
      await setValue((currentActivities) => {
        let activityToSave = { ...activity, source };
        if (source === 'imported') {
          const checkIndex = currentActivities.findIndex((a) => a.id === activity.id);
          if (checkIndex >= 0) {
            const maxId = Math.max(...currentActivities.map((a) => a.id), 0);
            activityToSave = { ...activityToSave, id: maxId + 1 };
          }
        }

        const existingIndex = currentActivities.findIndex((a) => a.id === activityToSave.id);
        if (existingIndex >= 0 && currentActivities[existingIndex].source === 'imported') {
          const updated = [...currentActivities];
          updated[existingIndex] = activityToSave;
          return updated;
        } else if (existingIndex < 0) {
          return [...currentActivities, activityToSave];
        }
        return currentActivities;
      });
    },
    [setValue]
  );

  const deleteActivity = useCallback(
    async (id: number) => {
      const filtered = activities.filter((a) => a.id !== id);
      await setValue(filtered);
    },
    [activities, setValue]
  );

  const getActivity = useCallback(
    (id: number) => {
      return activities.find((a) => a.id === id);
    },
    [activities]
  );

  const getAdminActivities = useCallback(() => {
    return activities.filter((a) => a.source === 'admin');
  }, [activities]);

  const getImportedActivities = useCallback(() => {
    return activities.filter((a) => a.source === 'imported');
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
    error,
  };
};
