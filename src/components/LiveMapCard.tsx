import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLiveMap } from '../hooks/useLiveMap';
import { Coordinate, Instruction } from '../models/map';

export type { Coordinate, Instruction };

interface LiveMapCardProps {
  destination: Coordinate;
  userLocation?: Location.LocationObject | null;
  routeCoordinates?: Coordinate[];
  instruction?: Instruction | null;
}

const LiveMapCard: React.FC<LiveMapCardProps> = ({
  destination,
  userLocation: externalLocation,
  routeCoordinates: externalRoute,
  instruction: externalInstruction,
}) => {
  const mapRef = useRef<MapView>(null);
  const [isUserPanning, setIsUserPanning] = useState(false);

  const internal = useLiveMap(destination);

  const userLocation = externalLocation !== undefined ? externalLocation : internal.userLocation;
  const routeCoordinates = externalRoute ?? internal.routeCoordinates;
  const instruction =
    externalInstruction !== undefined ? externalInstruction : internal.instruction;
  const isLoading = internal.isLoading && !routeCoordinates.length;

  useEffect(() => {
    if (mapRef.current && userLocation && !isUserPanning) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          },
          heading: userLocation.coords.heading || 0,
          zoom: 17.5,
        },
        { duration: 1000 }
      );
    }
  }, [userLocation, isUserPanning]);

  return (
    <View className="w-full overflow-hidden rounded-[32px] border border-gray-800 shadow-xl">
      <View className="h-72 w-full bg-gray-200">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass
          onPanDrag={() => setIsUserPanning(true)}
          initialRegion={
            userLocation
              ? {
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
              : undefined
          }>
          {routeCoordinates.length > 0 && (
            <Polyline
              key={`route-${routeCoordinates.length}`}
              coordinates={routeCoordinates}
              strokeColor="#3b82f6"
              strokeWidth={5}
              zIndex={1}
            />
          )}
          <Marker coordinate={destination} title="Destination" pinColor="green" />
        </MapView>

        {isLoading && (
          <View className="absolute inset-0 z-10 items-center justify-center bg-white/70">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        )}

        {isUserPanning && (
          <TouchableOpacity
            className="absolute bottom-4 right-4 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-lg"
            onPress={() => setIsUserPanning(false)}>
            <Text className="font-bold tracking-wide text-blue-500">Recenter</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="h-[1px] w-full bg-gray-800" />

      <View className="min-h-[90px] flex-row items-center justify-between bg-white px-6 py-5">
        <Text className="flex-1 text-xl font-semibold leading-snug tracking-tight text-gray-800">
          {instruction
            ? `${instruction.modifier.replace('_', ' ')} onto ${instruction.street}`
            : 'Calculating route...'}
        </Text>

        {instruction && (
          <View className="ml-4 flex-row items-center">
            <Text className="text-lg font-medium text-gray-800">
              {Math.max(1, Math.ceil(instruction.distance / 80))} mins
            </Text>
            <Text className="mx-2 text-lg text-gray-400">·</Text>
            <Text className="text-base text-gray-500">
              {instruction.distance >= 1000
                ? `${(instruction.distance / 1000).toFixed(1)} km`
                : `${instruction.distance}m`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LiveMapCard;
