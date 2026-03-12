import './global.css';
import {createStaticNavigation} from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
import ProfileSettingsStackNavigator from './src/navigation/ProfileSettingsStackNavigator';
import ProfileController from './src/controllers/ProfileController';

export default function App() {
 return (
    <ProfileController />
   );
}
