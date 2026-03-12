import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScreenModel } from '../models/screen';
import ActiviteDetail from '@/views/ActivityDetails';

import { Coordinate } from '../models/map';

const WAYPOINTS: Coordinate[] = [
  { latitude: 43.6091, longitude: 3.8806 },
  { latitude: 43.6118, longitude: 3.8802 },
  { latitude: 43.6112, longitude: 3.8708 },
];
const DetailController: React.FC = () => {
  const model: ScreenModel = { title: 'Detail', path: 'src/controllers/DetailController.tsx' };
  return (
    <SafeAreaProvider>
      <ActiviteDetail 
          id={1} 
          title= "Comédie lol" 
          imgUrl="https://lh3.googleusercontent.com/gps-cs-s/AHVAwerKZoUgDuMZ1wQbSXcKBUEbE7ocXQU7YhS7loEZISiHMRHRJsY1NP1GNtY3pJa8VsQEcOFVBkhjBMtGhtNSnY7HcT2JY5BGUMvfMmq-kLOM-VOgDd6de4fFwV_yJxA7jJpuvblQiauM64s=w675-h390-n-k-no" 
          etape={["Cinéma", "Artiste", "Fast food", "1", "2", "3"]} 
          waypoints={WAYPOINTS}
          description="lorem
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
};

export default DetailController;
