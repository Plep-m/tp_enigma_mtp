import { Buffer } from 'buffer';
import React from 'react';
global.Buffer = Buffer;

import './global.css';
import Navigator from './src/navigation/_layout';
export default function App() {
  return <Navigator />;
}

