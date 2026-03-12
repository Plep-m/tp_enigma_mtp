import React from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = {
  onStartScanning: () => void;
  onCreateBlank: () => void;
  hapticMedium: () => void;
  hapticLight: () => void;
};

const AdminQRControls: React.FC<Props> = ({
  onStartScanning,
  onCreateBlank,
  hapticMedium,
  hapticLight
}) => {
  return (
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
  );
};

export default AdminQRControls;
