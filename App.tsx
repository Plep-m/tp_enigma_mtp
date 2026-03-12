import { Buffer } from 'buffer';
global.Buffer = Buffer;

import './global.css';
import AdminController from './src/controllers/AdminController';
import ProfileController from './src/controllers/ProfileController';

export default function App() {
  return <ProfileController />;
}

