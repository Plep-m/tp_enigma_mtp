import React, { useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useMapRoute } from '../hooks/useMapRoute';
import { Coordinate } from '../models/map';

export type { Coordinate };

interface MapCardProps {
  waypoints: Coordinate[];
  routeCoordinates?: Coordinate[];
}

const MapCard: React.FC<MapCardProps> = ({ waypoints, routeCoordinates: externalRoute }) => {
  const mapRef = useRef<MapView>(null);
  const { routeCoordinates: internalRoute, isLoading } = useMapRoute(
    externalRoute ? [] : waypoints
  );
  const route = externalRoute ?? internalRoute;

  const handleMapReady = () => {
    if (mapRef.current && waypoints.length > 0) {
      mapRef.current.fitToCoordinates(waypoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <View className="w-full overflow-hidden rounded-[32px] border border-gray-800 shadow-xl">
      <View className="h-72 w-full bg-gray-200">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          onMapReady={handleMapReady}
          initialRegion={
            waypoints.length > 0
              ? {
                  latitude: waypoints[0].latitude,
                  longitude: waypoints[0].longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }
              : undefined
          }>
          <Polyline
            key={`route-${route.length}`}
            coordinates={route}
            strokeColor="#3b82f6"
            strokeWidth={4}
            zIndex={1}
          />
          {waypoints.map((point, index) => (
            <Marker
              key={`waypoint-${index}`}
              coordinate={point}
              title={
                index === 0 ? 'Start' : index === waypoints.length - 1 ? 'End' : `Stop ${index}`
              }
            />
          ))}
        </MapView>
        {isLoading && !externalRoute && (
          <View className="absolute inset-0 z-10 items-center justify-center bg-white/70">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        )}
      </View>
    </View>
  );
};

export default MapCard;
