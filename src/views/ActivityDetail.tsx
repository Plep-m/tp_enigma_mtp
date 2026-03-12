import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ActivityDetail = ({ route, navigation }: any) => {
  const { activity } = route.params;

  const steps = activity.steps ?? [];

  const handleStart = () => {
    alert("Commencer l'activité");
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* bouton retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        <Text style={styles.stepTitle}>Étape 1</Text>

        <Text style={styles.title}>{activity.title}</Text>

        {/* image */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: activity.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* map placeholder */}
        <View style={styles.mapCard}>
          <Text style={styles.mapTitle}>Carte / Maps</Text>
          <Text style={styles.mapText}>
            Zone réservée pour la map
          </Text>
        </View>

        {/* missions */}
        <Text style={styles.sectionTitle}>Missions à faire</Text>

        {steps.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune mission pour le moment
          </Text>
        ) : (
          steps.map((step: any, index: number) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step.description}</Text>
            </View>
          ))
        )}

        {/* bouton commencer */}
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Commencer</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityDetail;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  scroll: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15
  },

  backText: {
    fontSize: 18,
    fontWeight: "600"
  },

  stepTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20
  },

  image: {
    width: "100%",
    height: 250
  },

  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },

  mapTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  mapText: {
    fontSize: 16,
    color: "#555"
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20
  },

  stepItem: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  stepNumber: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16
  },

  stepText: {
    flex: 1,
    fontSize: 16
  },

  startButton: {
    backgroundColor: "#111",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20
  },

  startButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  }

});