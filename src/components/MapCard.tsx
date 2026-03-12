import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

interface MapCardProps {
  waypoints: Coordinate[];
  routeCoordinates: Coordinate[];
}

const MapCard: React.FC<MapCardProps> = ({ waypoints, routeCoordinates }) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current && waypoints.length > 0) {
      mapRef.current.fitToCoordinates(waypoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [waypoints]);

  return (
    <View className="w-full h-96 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={
          waypoints.length > 0
            ? {
                latitude: waypoints[0].latitude,
                longitude: waypoints[0].longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : undefined
        }
      >
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#3b82f6"
            strokeWidth={4}
          />
        )}
        {waypoints.map((point, index) => (
          <Marker
            key={`waypoint-${index}`}
            coordinate={point}
            title={index === 0 ? "Start" : index === waypoints.length - 1 ? "End" : `Stop ${index}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapCard;
