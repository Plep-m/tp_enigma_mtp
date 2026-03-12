import { StyleSheet, Text,FlatList, View, ScrollView, Button, Pressable } from "react-native";
import React from "react";
import {Image} from "expo-image";
import {SafeAreaView } from "react-native-safe-area-context";

import MapCard, { Coordinate } from '../components/MapCard';

import { useAppNavigation } from "../navigation/_layout";


type GreetingProps = {
  id: number;
  title: string;
  imgUrl: string;
  etape: Array<string>;
  description?: string;
  waypoints: Coordinate[];
};

export default function ActiviteDetail({ title, imgUrl, etape, description, waypoints }: GreetingProps) {
  
  const { goBack, canGoBack } = useAppNavigation();
  return (
    <SafeAreaView>
        <Pressable 
          style = {styles.backButton}
          onPress={goBack}
        >
          <Text style = {styles.textBoutton}>{'<'}</Text>
        </Pressable>
        <ScrollView>
          <View style={styles.container}>
          <Image style={styles.logo} source={{ uri: imgUrl }} />
          <View style={styles.description}>
            <Text style={styles.title}>
              {title}
            </Text>
            <ScrollView
            nestedScrollEnabled={true}>
              <Text style={styles.paragraph}>
                {description}
                {description}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.etape}>
            <Text style={styles.title}>
              Etapes:
            </Text>
            <FlatList
                nestedScrollEnabled={true}
                data={etape}
                renderItem={({ item }) => <Text style={styles.paragraph}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
          </View>
            <Text style={styles.title}>
              Localisation:
            </Text>
            <MapCard waypoints={waypoints} />
          </View>
        </ScrollView>
          
          <Pressable
            style = {styles.playButton}
            onPress = {() => alert("play button")}>
            <Text style = {styles.textBoutton}>Play</Text>
          </Pressable>          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 90,
    backgroundColor: "#f7f7f7",
  },
  paragraph: {
    margin: 10,
    fontSize: 14,
    textAlign: "left",
  },
  logo: {
    height: 250,
    width: "100%",
  },
  title: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  description:{
    width: "95%",
    height: 200,
    backgroundColor: "#ffffff",
    marginTop: -20,
    borderRadius: 15,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
  },
  etape: {
    width: "95%",
    backgroundColor: "#ffffff",
    marginTop: 20,
    maxHeight: 200
    
  },
  backButton: {
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    top: 50,
    left: 10,
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
  textBoutton:{
    color: "#000000",
    fontSize: 25,
    fontWeight: "medium",
  },
  map:{
    marginTop: 20,
    width: "98%",
    height: 250,
  },
  playButton: {
    position: "absolute",
    borderRadius: 10,
    padding: 10,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "7%",
    top: "95%",
    left: "36%",
    backgroundColor: "#22c64e",
    zIndex: 1,
  },
});
