import React from 'react';
import LiveMapView from '../views/LiveMapView';
import { Coordinate } from '../models/map';

export type { Instruction } from '../models/map';

const DESTINATION: Coordinate = { latitude: 43.6084, longitude: 3.8794 };

const LiveMapController: React.FC = () => <LiveMapView destination={DESTINATION} />;

export default LiveMapController;
