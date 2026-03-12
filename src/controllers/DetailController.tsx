import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScreenModel } from '../models/screen';
import Detail from '@/views/Detail';

const DetailController: React.FC = () => {
  const model: ScreenModel = { title: 'Detail', path: 'src/controllers/DetailController.tsx' };
  return (
    <SafeAreaProvider>
      <Detail />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
};

export default DetailController;
