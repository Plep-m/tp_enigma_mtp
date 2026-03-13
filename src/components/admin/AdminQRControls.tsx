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
  hapticLight,
}) => {
  return (
    <View className="mb-6 flex-row gap-2">
      <Pressable
        onPress={() => {
          hapticMedium();
          onStartScanning();
        }}
        className="flex-1 rounded bg-black py-3"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        <Text className="text-center text-white">Scan QR</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          hapticLight();
          onCreateBlank();
        }}
        className="flex-1 rounded border border-black py-3"
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
        <Text className="text-center">New</Text>
      </Pressable>
    </View>
  );
};

export default AdminQRControls;
