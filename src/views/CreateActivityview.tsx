import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,} from "react-native";
import { activities } from "../data/activities";

const CreateActivityview = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!title.trim() || !description.trim() || !image.trim()) {
      alert("Veuillez remplir le titre, l’image et la description.");
      return;
    }

    const newActivity = {
    id: Date.now(),
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      steps: [],
    };

    activities.push(newActivity);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer une activité</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Image (URL)"
        value={image}
        onChangeText={setImage}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#111",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateActivityview;