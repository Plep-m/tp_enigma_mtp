import React from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeView from '../views/HomeView';

const AppController: React.FC = () => {
  return (
    <>
      <HomeView />
      <StatusBar style="dark" />
    </>
  );
};

export default AppController;
