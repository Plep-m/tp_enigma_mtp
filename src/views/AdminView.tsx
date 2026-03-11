import React, { useRef } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { impactAsync, ImpactFeedbackStyle, notificationAsync, NotificationFeedbackType } from 'expo-haptics';
import QRScanner from '../../components/QRScanner';
import { Activity, Etape } from '../models/admin';

type Props = {
  activity: Activity | null;
  generatedQRCode: string | null;
  isScanning: boolean;
  onUpdateActivity: (activity: Activity) => void;
  onGenerateQR: () => void;
  onStartScanning: () => void;
  onScan: (data: string) => void;
  onCloseScanner: () => void;
  onCreateBlank: () => void;
};

const AdminView: React.FC<Props> = ({
  activity,
  generatedQRCode,
  isScanning,
  onUpdateActivity,
  onGenerateQR,
  onStartScanning,
  onScan,
  onCloseScanner,
  onCreateBlank,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const etapeRefs = useRef<{ [key: number]: View | null }>({});
  
  const hapticLight = () => impactAsync(ImpactFeedbackStyle.Light);
  const hapticMedium = () => impactAsync(ImpactFeedbackStyle.Medium);
  const hapticSuccess = () => notificationAsync(NotificationFeedbackType.Success);

  if (isScanning) {
    return <QRScanner onScan={onScan} onClose={onCloseScanner} />;
  }

  const updateEtape = (index: number, updatedEtape: Etape) => {
    if (!activity) return;
    const newEtapes = [...activity.etapes];
    newEtapes[index] = updatedEtape;
    onUpdateActivity({ ...activity, etapes: newEtapes });
  };

  const addEtape = () => {
    if (!activity) return;
    const newEtape: Etape = {
      titre: '',
      poi: '',
      description: '',
      condition_victoire: '1',
      reponse: '',
      radius: 50
    };
    onUpdateActivity({ ...activity, etapes: [...activity.etapes, newEtape] });
  };

  const removeEtape = (index: number) => {
    if (!activity) return;
    const newEtapes = activity.etapes.filter((_, i) => i !== index);
    onUpdateActivity({ ...activity, etapes: newEtapes });
  };

  const scrollToEtape = (index: number) => {
    const etapeView = etapeRefs.current[index];
    if (etapeView && scrollViewRef.current) {
      etapeView.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
        },
        () => {}
      );
    }
  };

  const handleEtapeFocus = (index: number) => {
    hapticLight();
    setTimeout(() => scrollToEtape(index), 150);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 py-6"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Text className="text-2xl font-bold mb-6">Admin</Text>

          <View className="flex-row gap-2 mb-6">
            <Pressable 
              onPress={() => {
                hapticMedium();
                onStartScanning();
              }}
              className="flex-1 bg-black py-3 rounded"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text className="text-white text-center">Scan QR</Text>
            </Pressable>
            <Pressable 
              onPress={() => {
                hapticLight();
                onCreateBlank();
              }}
              className="flex-1 border border-black py-3 rounded"
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Text className="text-center">New</Text>
            </Pressable>
          </View>

          {activity && (
            <>
              <View className="mb-6">
                <Text className="text-sm mb-2">Title</Text>
                <TextInput
                  value={activity.title}
                  onChangeText={(text) => onUpdateActivity({ ...activity, title: text })}
                  onFocus={hapticLight}
                  className="border border-gray-300 rounded px-3 py-2"
                  returnKeyType="next"
                />
              </View>

              <View className="mb-6">
                <Text className="text-sm mb-2">Description</Text>
                <TextInput
                  value={activity.description}
                  onChangeText={(text) => onUpdateActivity({ ...activity, description: text })}
                  onFocus={hapticLight}
                  className="border border-gray-300 rounded px-3 py-2"
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>

              <View className="mb-6">
                <Text className="text-sm mb-2">Image URL</Text>
                <TextInput
                  value={activity.uri}
                  onChangeText={(text) => onUpdateActivity({ ...activity, uri: text })}
                  onFocus={hapticLight}
                  className="border border-gray-300 rounded px-3 py-2"
                  returnKeyType="next"
                />
              </View>

              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-lg font-bold">Étapes</Text>
                  <Pressable 
                    onPress={() => {
                      hapticLight();
                      addEtape();
                    }}
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                  >
                    <Text className="text-blue-600">+ Add</Text>
                  </Pressable>
                </View>

                {activity.etapes.map((etape, index) => (
                  <View 
                    key={index} 
                    ref={(ref) => { etapeRefs.current[index] = ref; }}
                    className="border border-gray-200 rounded p-3 mb-3"
                  >
                    <View className="flex-row justify-between mb-3">
                      <Text className="font-medium">#{index + 1}</Text>
                      <Pressable 
                        onPress={() => {
                          hapticMedium();
                          removeEtape(index);
                        }}
                        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                      >
                        <Text className="text-red-600">Remove</Text>
                      </Pressable>
                    </View>

                    <TextInput
                      value={etape.titre}
                      onChangeText={(text) => updateEtape(index, { ...etape, titre: text })}
                      onFocus={() => handleEtapeFocus(index)}
                      className="border border-gray-200 rounded px-2 py-2 mb-2"
                      placeholder="Title"
                      returnKeyType="next"
                      
                    />

                    <TextInput
                      value={etape.poi}
                      onChangeText={(text) => updateEtape(index, { ...etape, poi: text })}
                      onFocus={() => handleEtapeFocus(index)}
                      className="border border-gray-200 rounded px-2 py-2 mb-2"
                      placeholder="Location (lat, lng)"
                      returnKeyType="next"
                      
                    />

                    <TextInput
                      value={etape.description}
                      onChangeText={(text) => updateEtape(index, { ...etape, description: text })}
                      onFocus={() => handleEtapeFocus(index)}
                      className="border border-gray-200 rounded px-2 py-2 mb-2"
                      multiline
                      numberOfLines={2}
                      placeholder="Description"
                      textAlignVertical="top"
                    />

                    <View className="flex-row gap-2">
                      <TextInput
                        value={etape.reponse}
                        onChangeText={(text) => updateEtape(index, { ...etape, reponse: text })}
                        onFocus={() => handleEtapeFocus(index)}
                        className="flex-1 border border-gray-200 rounded px-2 py-2"
                        placeholder="Answer"
                        returnKeyType="next"
                        
                      />
                      <TextInput
                        value={String(etape.radius)}
                        onChangeText={(text) => updateEtape(index, { ...etape, radius: parseInt(text) || 0 })}
                        onFocus={() => handleEtapeFocus(index)}
                        className="w-20 border border-gray-200 rounded px-2 py-2"
                        keyboardType="numeric"
                        placeholder="50m"
                        returnKeyType="done"
                      />
                    </View>
                  </View>
                ))}
              </View>

              <Pressable 
                onPress={() => {
                  hapticSuccess();
                  onGenerateQR();
                }}
                className="bg-black py-4 rounded mb-6"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-white text-center font-medium">Generate QR</Text>
              </Pressable>

              {generatedQRCode && (
                <View className="items-center mb-6">
                  <View className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <QRCode value={generatedQRCode} size={200} />
                  </View>
                </View>
              )}
            </>
          )}

          {!activity && (
            <View className="py-12">
              <Text className="text-gray-400 text-center">
                Scan or create an activity
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminView;
