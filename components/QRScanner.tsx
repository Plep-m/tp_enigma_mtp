import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {ImpactFeedbackStyle , impactAsync, NotificationFeedbackType, notificationAsync} from 'expo-haptics';

type Props = {
  onScan: (data: string) => void;
  onClose: () => void;
};

const QRScanner: React.FC<Props> = ({ onScan, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View className="flex-1 items-center justify-center bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900 px-6">
        <Text className="text-white text-xl text-center mb-6">
          Camera permission required
        </Text>
        <Pressable
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Medium);
            requestPermission();
          }}
          className="bg-white px-6 py-3 rounded"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Text className="font-semibold">Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      notificationAsync(NotificationFeedbackType.Success);
      onScan(data);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />
      
      <View className="absolute inset-0 items-center justify-center">
        <View className="w-64 h-64 border-2 border-white rounded-xl" />
        <Text className="text-white text-center mt-8 text-lg px-6">
          Position QR code within frame
        </Text>
      </View>

      <View className="absolute top-12 left-0 right-0 px-4">
        <Pressable
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Light);
            onClose();
          }}
          className="bg-white/90 px-6 py-3 rounded self-start"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Text className="font-semibold">✕ Close</Text>
        </Pressable>
      </View>

      {scanned && (
        <View className="absolute bottom-12 left-0 right-0 px-4">
          <Pressable
            onPress={() => {
              impactAsync(ImpactFeedbackStyle.Light);
              setScanned(false);
            }}
            className="bg-white px-6 py-4 rounded"
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <Text className="font-semibold text-center">
              Scan Again
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default QRScanner;