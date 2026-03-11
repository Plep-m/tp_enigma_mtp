import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ScreenView from '../views/ScreenView';
import { ScreenModel } from '../models/screen';

const AppController: React.FC = () => {
  const model: ScreenModel = { title: 'Home', path: 'src/controllers/AppController.tsx' };
  return (
    <SafeAreaProvider>
      <ScreenView model={model} />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
};

export default AppController;
