import React, { useState, useEffect } from 'react';
import MapView from '../views/MapView';
import { Coordinate } from 'components/MapCard'
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
        
        const url = `https://router.project-osrm.org/route/v1/foot/${coordinatesString}?overview=full&geometries=geojson`;
        console.log(url)
        const response = await fetch(url);
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
