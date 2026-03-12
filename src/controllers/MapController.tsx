import React from 'react';
import MapView from '../views/MapView';
import { Coordinate } from '../models/map';

const WAYPOINTS: Coordinate[] = [
  { latitude: 43.6091, longitude: 3.8806 },
  { latitude: 43.6118, longitude: 3.8802 },
  { latitude: 43.6112, longitude: 3.8708 },
];

const MapController: React.FC = () => <MapView waypoints={WAYPOINTS} />;

export default MapController;
