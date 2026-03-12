import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LiveMapCard from '../components/LiveMapCard';
import MapCard, { Coordinate } from '../components/MapCard';

type Props = {
  waypoints: Coordinate[];
  destination: Coordinate;
};

const ItineraryView: React.FC<Props> = ({ waypoints, destination }) => (
  <SafeAreaView edges={['top', 'bottom', 'left', 'right']} className="flex-1 bg-gray-100">
    <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16, padding: 16 }} showsVerticalScrollIndicator={false}>
      <LiveMapCard destination={destination} />
      <MapCard waypoints={waypoints} />
    </ScrollView>
  </SafeAreaView>
);

export default ItineraryView;
