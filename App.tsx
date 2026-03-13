import { Buffer } from 'buffer';
import React from 'react';

import './global.css';
import Navigator from './src/navigation/_layout';
global.Buffer = Buffer;
export default function App() {
  return <Navigator />;
}
