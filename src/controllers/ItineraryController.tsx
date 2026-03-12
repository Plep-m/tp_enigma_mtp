import React from 'react';
import ItineraryView from '../views/ItineraryView';
import { Coordinate } from '../models/map';

const WAYPOINTS: Coordinate[] = [
  { latitude: 43.6091, longitude: 3.8806 },
  { latitude: 43.6118, longitude: 3.8802 },
  { latitude: 43.6112, longitude: 3.8708 },
];

const ItineraryController: React.FC = () => (
  <ItineraryView
    waypoints={WAYPOINTS}
    destination={WAYPOINTS[WAYPOINTS.length - 1]}
  />
);

export default ItineraryController;
