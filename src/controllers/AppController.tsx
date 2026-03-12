import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TempHomeView from '../views/TempHomeView';

const AppController: React.FC = () => {
  return (
    <>
      <TempHomeView />
      <StatusBar style="dark" />
    </>
  );
};

export default AppController;
