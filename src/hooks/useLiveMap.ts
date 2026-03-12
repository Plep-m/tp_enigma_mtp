import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import MapModel, { Coordinate, Instruction } from '../models/map';

export function useLiveMap(destination: Coordinate) {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [instruction, setInstruction] = useState<Instruction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let sub: Location.LocationSubscription | undefined;

    MapModel.requestPermission().then((granted) => {
      if (!granted) {
        Alert.alert('Permission Denied', 'GPS is required for navigation.');
        setIsLoading(false);
        return;
      }
      MapModel.watchPosition(setUserLocation).then((s) => (sub = s));
    });

    return () => sub?.remove();
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const from: Coordinate = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    };

    MapModel.fetchLiveRoute(from, destination)
      .then(({ coordinates, instruction: instr }) => {
        setRouteCoordinates(coordinates);
        setInstruction(instr);
      })
      .catch((err) => console.error('[useLiveMap]', err))
      .finally(() => setIsLoading(false));
  }, [
    userLocation?.coords.latitude,
    userLocation?.coords.longitude,
    destination.latitude,
    destination.longitude,
  ]);

  return { userLocation, routeCoordinates, instruction, isLoading };
}
