import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapCard, { Coordinate } from '../components/MapCard';

type Props = {
  waypoints: Coordinate[];
};

const MapView: React.FC<Props> = ({ waypoints }) => (
  <SafeAreaView
    edges={['top', 'bottom', 'left', 'right']}
    className="flex-1 items-center justify-center bg-white p-4">
    <MapCard waypoints={waypoints} />
  </SafeAreaView>
);

export default MapView;
