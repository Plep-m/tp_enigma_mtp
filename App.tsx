import './global.css';
import {createStaticNavigation} from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
import ProfileSettingsStackNavigator from './src/navigation/ProfileSettingsStackNavigator';

export default function App() {
 return (
     <NavigationContainer>
       <ProfileSettingsStackNavigator />;
     </NavigationContainer>
   );
}
