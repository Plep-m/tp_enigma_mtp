import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  ImpactFeedbackStyle,
  impactAsync,
  NotificationFeedbackType,
  notificationAsync,
} from 'expo-haptics';

type Props = {
  onScan: (data: string) => void;
  onClose: () => void;
};

const QRScanner: React.FC<Props> = ({ onScan, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const scanningRef = useRef(true);

  if (!permission) {
    return <View className="flex-1 items-center justify-center bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900 px-6">
        <Text className="mb-6 text-center text-xl text-white">Camera permission required</Text>
        <Pressable
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Medium);
            requestPermission();
          }}
          className="rounded bg-white px-6 py-3"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
          <Text className="font-semibold">Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanningRef.current) {
      scanningRef.current = false;
      notificationAsync(NotificationFeedbackType.Success);
      onScan(data);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      <View className="absolute inset-0 items-center justify-center">
        <View className="h-64 w-64 rounded-xl border-2 border-white" />
        <Text className="mt-8 px-6 text-center text-lg text-white">
          Position QR code within frame
        </Text>
      </View>

      <View className="absolute left-0 right-0 top-12 px-4">
        <Pressable
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Light);
            onClose();
          }}
          className="self-start rounded bg-white/90 px-6 py-3"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
          <Text className="font-semibold">✕ Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default QRScanner;
