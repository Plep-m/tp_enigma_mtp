import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileModel } from '../models/profile';
import { profileFields } from "../components/profileFields";
import { useAppNavigation } from "../navigation/_layout";

type Props = {
  profile : ProfileModel | null;
  editingField: keyof ProfileModel | null;
  setEditingField: (field: keyof ProfileModel | null) => void;
  handleUpdateField: (fieldKey: keyof ProfileModel, value: string | number) => void;
};


const ProfileView: React.FC<Props> = (
{ profile, editingField, setEditingField, handleUpdateField}
) => {
  const [tempValue, setTempValue] = useState("");
  const { navigate } = useAppNavigation();
    return (
        <SafeAreaView className="flex-1 bg-white">
          <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          className="flex-1" 
          keyboardVerticalOffset={90} // pour avoir de la marge par rapport au header
          >
            <ScrollView 
            className="flex-1 px-4 py-6" 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            >
            {/* Header */}
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
            <View className="flex-1 items-center">
                <Text className="text-3xl font-bold text-gray-900">Profil utilisateur</Text>
            </View>
            <TouchableOpacity 
                onPress={() => {
                  navigate('Settings');
                }}
            >
                <Text className="text-2xl">⚙️</Text>
            </TouchableOpacity>
          </View> 
           
           {!profile ? (

            <View className="flex-1 justify-center items-center">
              <Text>Chargement...</Text>
            </View>
            ) : ( 
                <>
            <View className="mt-6 mb-6 items-center">
            <Image
                source={{uri: profile.profile_pic_url}}
                className="w-24 h-24 rounded-full"
                onError={() => console.warn('Image non chargée')}
            />
            </View>

        {/* Stats Cards */}
        <View className="px-4 mb-6">
            <View className="flex-row space-x-3 mb-3">
            {/* Première card */}
            <View className="flex-1 p-3 bg-white border border-default rounded-xl justify-center shadow-md">
              <Text>Lieux visités : <Text className="text-sky-400">[300]</Text></Text>
            </View>
            {/* Deuxième card */}
            <View className="flex-1 p-3 bg-white border border-default rounded-xl justify-center shadow-md">
              <Text>Activités réalisées : <Text className="text-sky-400">[99]</Text></Text>
            </View>
          </View>
             {/* Troisième card */}
            <View className="p-3 mb-2 bg-white border border-default rounded-xl justify-center shadow-md">
              <Text>Classement score des lieux :</Text>
              <Text className="text-sky-400">- 1 | Comédie</Text>
              <Text className="text-sky-400">- 2 | Millénaire</Text>
              <Text className="text-sky-400">- 3 | Jardins des plantes</Text>
              <Text className="text-sky-400">- 4 | ...</Text>
            </View>
            {/* Quatrième card */}
            <View className="p-3 bg-white border border-default rounded-xl justify-center shadow-md">
              <Text>Distance la plus longue parcourue : 
                <Text className="text-sky-400"> Comédie -- Millénaire (10 km)</Text>
              </Text>
            </View>
        </View>
        {/* Champs utilisateur avec bouton ✏️ */}
            <View className="w-11/12 mx-auto space-y-4">
                {profileFields.map((profileField) => (
                    <View key={profileField.key} className="flex-row justify-between items-center border-b border-gray-200 py-2">
                    <Text className="text-lg text-gray-700">{profileField.label} :</Text>
                    {editingField === profileField.key ?
                      (
                        <TextInput
                          className="border border-gray-300 rounded px-2 py-1 w-1/3"
                          value={tempValue}
                          onChangeText={setTempValue}
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            handleUpdateField(profileField.key, tempValue);
                            setEditingField(null);
                          }}
                          />
                      ) : (
                        <>
                          {profile ? (<><Text className="text-sky-400"> {profile[profileField.key]}</Text></>) : <></>}
                        </>
                      )}

                    <TouchableOpacity onPress={() => {
                      setTempValue(String(profile[profileField.key]));
                      setEditingField(editingField === profileField.key ? null : profileField.key);
                      }
                      }>
                      <Text className="text-xl">✏️</Text>
                    </TouchableOpacity>
                 </View>
                 
                 ))
                }
            </View>
      </>
            )}
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
      );
};

export default ProfileView;