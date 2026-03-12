import { useCallback } from 'react';
import { Stat } from '../models/stats';
import { useAsyncStorage, } from './useAsyncStorage';

const STATS_KEY = 'stats';

const defaultStatsData: Stat = {
    visitedLocations: 300,
    RealizedActivities: 99,
    maxKmDistanceTraveled: 10,
    itineraryMaxDistanceTraveled: "Comédie -- Millénaire"
};

export const useStats = () => {
  const { value: stats, setValue: setStats, loading, error, refresh } = useAsyncStorage<Stat>(
    STATS_KEY, defaultStatsData
  );
  
   const getStats = useCallback(() => {
    return stats ?? defaultStatsData;
  }, [stats]);

  const refreshStats = useCallback(async() => {
    await refresh();
  }, [refresh]);
  
  // à ce jour, uniquement pour test de dev (rafraîchissement de valeurs)
  const setStatsDefault = useCallback(async() => {
    await setStats({
        visitedLocations: 34,
        RealizedActivities: 100,
        maxKmDistanceTraveled: 10,
        itineraryMaxDistanceTraveled: "Comédie -- Millénaire"
    });
  }, [stats, setStats])

  return {
    stats,
    loading,
    error,
    getStats,
    refreshStats,
    setStatsDefault
  };
};
