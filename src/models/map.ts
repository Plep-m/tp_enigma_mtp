import * as Location from 'expo-location';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Instruction = {
  distance: number;
  modifier: string;
  street: string;
};

export type LiveRouteResult = {
  coordinates: Coordinate[];
  instruction: Instruction | null;
};

const getBaseUrl = () =>
  process.env.EXPO_PUBLIC_OSRM_BASE_URL || 'https://osrm.plep-lab.com';

const getApiKey = () =>
  process.env.EXPO_PUBLIC_OSRM_API_KEY || '';

const MapModel = {
  async requestPermission(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  },

  async watchPosition(
    callback: (location: Location.LocationObject) => void
  ): Promise<Location.LocationSubscription> {
    return Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 5 },
      callback
    );
  },

  async fetchRoute(waypoints: Coordinate[]): Promise<Coordinate[]> {
    if (waypoints.length < 2) return [];

    const coords = waypoints.map((wp) => `${wp.longitude},${wp.latitude}`).join(';');
    const url = `${getBaseUrl()}/route/v1/foot/${coords}?overview=full&geometries=geojson`;

    const response = await fetch(url, {
      headers: { 'x-api-key': getApiKey(), Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes.length) throw new Error('No route found');

    return data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
      latitude: lat,
      longitude: lng,
    }));
  },

  async fetchLiveRoute(from: Coordinate, to: Coordinate): Promise<LiveRouteResult> {
    const coords = `${from.longitude},${from.latitude};${to.longitude},${to.latitude}`;
    const url = `${getBaseUrl()}/route/v1/foot/${coords}?overview=full&geometries=geojson&steps=true`;

    const response = await fetch(url, {
      headers: { 'x-api-key': getApiKey(), Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes.length) throw new Error('No route found');

    const coordinates: Coordinate[] = data.routes[0].geometry.coordinates.map(
      ([lng, lat]: [number, number]) => ({ latitude: lat, longitude: lng })
    );

    const steps = data.routes[0].legs[0].steps;
    const nextStep = steps[1];
    const instruction: Instruction = nextStep
      ? {
          distance: Math.round(steps[0].distance),
          modifier: nextStep.maneuver.modifier || nextStep.maneuver.type,
          street: nextStep.name || 'an unknown road',
        }
      : { distance: 0, modifier: 'arrive', street: 'your destination' };

    return { coordinates, instruction };
  },
};

export default MapModel;
