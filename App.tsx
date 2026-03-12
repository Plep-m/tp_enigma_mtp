import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homeview from "./src/views/Homeview";
import ActivityDetail from "./src/views/ActivityDetail";
import CreateActivityview from "./src/views/CreateActivityview";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function Profil() {
  return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
}

function Parametres() {
  return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Homeview} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Parametres" component={Parametres} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen name="ActivityDetail" component={ActivityDetail} />
        <RootStack.Screen name="CreateActivity" component={CreateActivityview} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}