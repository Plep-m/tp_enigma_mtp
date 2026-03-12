import { Buffer } from 'buffer';
global.Buffer = Buffer;

import './global.css';
import AdminController from './src/controllers/AdminController';

export default function App() {
  return <AdminController />;
}
