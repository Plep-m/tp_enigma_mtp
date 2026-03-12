import React, { useCallback, useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,Pressable,Image,ScrollView,Alert} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { activities } from "../data/activities";

const Homeview = ({ navigation }: any) => {
  const [activitiesList, setActivitiesList] = useState([...activities]);

  useFocusEffect(
    useCallback(() => {
      setActivitiesList([...activities]);
    }, [])
  );

  const handleCardPress = (activity: any) => {
    navigation.navigate("ActivityDetail", { activity });
  };

  const handleAddPress = () => {
    navigation.navigate("CreateActivity");
  };

  const handleQRPress = () => {
    alert("Scanner QR Code");
  };

  const handleDeleteCard = (activityTitle: string) => {
    Alert.alert(
      "Supprimer l'activité",
      "Tu veux vraiment supprimer cette carte ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            const index = activities.findIndex(
              (item) => item.title === activityTitle
            );

            if (index !== -1) {
              activities.splice(index, 1);
              setActivitiesList([...activities]);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.sectionTitle}>Activités</Text>

        <Pressable style={styles.qrButton} onPress={handleQRPress}>
          <Text style={styles.qrPlus}>+</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activitiesList.map((item, index) => (
          <View key={`${item.title}-${index}`} style={styles.cardWrapper}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCard(item.title)}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.cardSubtitle} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addCard}
          onPress={handleAddPress}
          activeOpacity={0.8}
        >
          <Text style={styles.addCardPlus}>+</Text>
          <Text style={styles.addCardText}>Ajouter une activité</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 70,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },

  qrButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },

  qrPlus: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  cardWrapper: {
    position: "relative",
    marginBottom: 18,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 22,
  },

  cardImage: {
    width: "100%",
    height: 180,
  },

  cardContent: {
    padding: 14,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  cardSubtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },

  addCard: {
    width: "100%",
    height: 90,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#111",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 6,
  },

  addCardPlus: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },

  addCardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});

export default Homeview;