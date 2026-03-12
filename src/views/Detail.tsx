import { View } from "react-native";
import React from "react";
import ActiviteDetail from "@/models/ActivityDetails";
export default function Detail() {
  return (
    <View>
      <ActiviteDetail 
          id={1} 
          title= "Comédie lol" 
          imgUrl="https://lh3.googleusercontent.com/gps-cs-s/AHVAwerKZoUgDuMZ1wQbSXcKBUEbE7ocXQU7YhS7loEZISiHMRHRJsY1NP1GNtY3pJa8VsQEcOFVBkhjBMtGhtNSnY7HcT2JY5BGUMvfMmq-kLOM-VOgDd6de4fFwV_yJxA7jJpuvblQiauM64s=w675-h390-n-k-no" 
          etape={["Cinéma", "Artiste", "Fast food", "1", "2", "3"]} 
          description="lorem
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />

    </View>
  );
}
