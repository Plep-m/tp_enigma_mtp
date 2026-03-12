import { Buffer } from 'buffer';
global.Buffer = Buffer;

import './global.css';
import Navigator from './src/navigation/_layout';
export default function App() {
  return <Navigator />;
}

