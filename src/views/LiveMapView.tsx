import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LiveMapCard from '../components/LiveMapCard';
import { Coordinate } from '../models/map';

type Props = {
  destination: Coordinate;
};

const LiveMapView: React.FC<Props> = ({ destination }) => (
  <SafeAreaView
    edges={['top', 'bottom', 'left', 'right']}
    className="flex-1 items-center justify-center bg-gray-100 p-6">
    <LiveMapCard destination={destination} />
  </SafeAreaView>
);

export default LiveMapView;
