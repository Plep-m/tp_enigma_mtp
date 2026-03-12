import React, {useState} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsModel } from '../models/settings';
import { settingsFields } from "../components/settingsFields";
import { useAppNavigation } from "../navigation/_layout";

type Props = {
    settings: SettingsModel | null,
    editingField: keyof SettingsModel | null;
    setEditingField: (field: keyof SettingsModel | null) => void;
    handleUpdateField: (fieldKey: keyof SettingsModel, value: string) => void;

};

const SettingsView: React.FC<Props> = (
    {settings, editingField, setEditingField, handleUpdateField}
) => {
    const [tempValue, setTempValue] = useState("");
    const { goBack, canGoBack } = useAppNavigation();
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
            {canGoBack ? (
              <TouchableOpacity onPress={goBack}>
                <Text className="text-2xl">←</Text>
              </TouchableOpacity>
            ) : <View className="w-8" />}
            <View className="flex-1 items-center">
                <Text className="text-3xl font-bold text-gray-900">Paramètres</Text>
            </View>
            <View className="w-8" />
          </View> 

          {!settings ? (

             <View className="flex-1 justify-center items-center">
              <Text>Chargement...</Text>
            </View>
            ) : ( 
                <>
                {/* Champs utilisateur avec bouton ✏️ */}
            <View className="w-11/12 mx-auto space-y-4">
                {settingsFields.map((settingsField) => (
                    <View key={settingsField.key} className="flex-row justify-between items-center border-b border-gray-200 py-2"> 
                    <Text className="text-lg text-gray-700">{settingsField.label} : </Text>
                    {editingField === settingsField.key ?
                    (
                        <TextInput
                          className="border border-gray-300 rounded px-2 py-1 w-1/3"
                          value={tempValue}
                          onChangeText={setTempValue}
                          returnKeyType="done"
                          onSubmitEditing={() => {
                            handleUpdateField(settingsField.key, tempValue);
                            setEditingField(null);
                          }}
                          />
                        ) : (

                        <>
                                              
                     {settings ? (<><Text className="text-sky-400"> {settings[settingsField.key]}</Text></>) : <></>}
                     </>
                        )}
                    <TouchableOpacity onPress={() => 
                        {
                            setTempValue(settings[settingsField.key]);
                            setEditingField(editingField === settingsField.key ? null : settingsField.key);
                        }}
                    >
                    <Text className="text-xl">✏️</Text>
                    </TouchableOpacity>
                 </View>
                ))}
                </View>
                </>
                )}
                 </SafeAreaView>
      );
    
}

export default SettingsView;