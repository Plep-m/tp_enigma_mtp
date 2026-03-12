import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileView from "../views/ProfileView";
import SettingsView from "../views/SettingsView";
import ProfileController from "../controllers/ProfileController";
import SettingsController from "../controllers/SettingsController";

export type ProfileSettingsStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

const ProfileSettingsStack = createNativeStackNavigator<ProfileSettingsStackParamList>();

export default function ProfileSettingsStackNavigator(){
  return(
    <ProfileSettingsStack.Navigator>
        <ProfileSettingsStack.Screen name="Profile" component={ProfileController} options={{ title: "Profil utilisateur" }}/>
        <ProfileSettingsStack.Screen name="Settings" component={SettingsController} options={{ title: "Paramètres" }} />
    </ProfileSettingsStack.Navigator>
  );
};
