import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredValue();
  }, [key]);

  const loadStoredValue = async () => {
    try {
      setLoading(true);
      setError(null);
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading from AsyncStorage:', err);
    } finally {
      setLoading(false);
    }
  };

  const setValue = useCallback(async (value: T) => {
    try {
      setError(null);
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      setError('Failed to save data');
      console.error('Error saving to AsyncStorage:', err);
    }
  }, [key]);

  const removeValue = useCallback(async () => {
    try {
      setError(null);
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (err) {
      setError('Failed to remove data');
      console.error('Error removing from AsyncStorage:', err);
    }
  }, [key, initialValue]);

  const refresh = useCallback(async () => {
    await loadStoredValue();
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    refresh,
    loading,
    error
  };
};
