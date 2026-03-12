import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapCard, { Coordinate } from 'components/MapCard';

type Props = {
  waypoints: Coordinate[];
  routeCoordinates: Coordinate[];
  isLoading: boolean;
};

const MapView: React.FC<Props> = ({ waypoints, routeCoordinates, isLoading }) => {
  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} className="flex-1 bg-white justify-center p-4">
      <View className="relative">
        <MapCard waypoints={waypoints} routeCoordinates={routeCoordinates} />
        {isLoading && (
          <View className="absolute inset-0 rounded-xl bg-white/70 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapView;
