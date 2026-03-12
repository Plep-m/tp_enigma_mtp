import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { ScreenModel } from '../models/screen';
import Homeview from  '@/views/Homeview';
import { View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const HomeController: React.FC = () => {
  const model: ScreenModel = { title: 'ENIGMA MTPs', path: '<source /controllers/HomeController.tsx>' };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style ="auto"/>
      <Homeview />
    </SafeAreaView>

  );
};



export default HomeController;