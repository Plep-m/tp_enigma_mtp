import React, { useState, useEffect } from 'react';
import MapView from '../views/MapView';
import { Coordinate } from 'components/MapCard';
import { Alert } from 'react-native';

const MapController: React.FC = () => {
  const [waypoints] = useState<Coordinate[]>([
    { latitude: 43.6091, longitude: 3.8806 },
    { latitude: 43.6118, longitude: 3.8802 },
    { latitude: 43.6112, longitude: 3.8708 },
  ]);
  
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      if (waypoints.length < 2) return;

      try {
        const coordinatesString = waypoints
          .map((wp) => `${wp.longitude},${wp.latitude}`)
          .join(';');
        
        const baseUrl = process.env.EXPO_PUBLIC_OSRM_BASE_URL || 'https://router.project-osrm.org';
        const apiKey = process.env.EXPO_PUBLIC_OSRM_API_KEY || '';
        
        const url = `${baseUrl}/route/v1/foot/${coordinatesString}?overview=full&geometries=geojson`;
        console.log('Fetching route from:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.code === 'Ok' && data.routes.length > 0) {
          const points = data.routes[0].geometry.coordinates.map((coord: [number, number]) => ({
            latitude: coord[1],
            longitude: coord[0],
          }));
          
          setRouteCoords(points);
        } else {
          Alert.alert('Routing Error', 'Could not find a valid route.');
        }
      } catch (error) {
        console.error('Fetch route error:', error);
        Alert.alert('Network Error', 'Failed to fetch the route data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoute();
  }, [waypoints]);

  return <MapView waypoints={waypoints} routeCoordinates={routeCoords} isLoading={isLoading} />;
};

export default MapController;
