import React from 'react';
import { View, Text, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  generatedQRCode: string | null;
  onGenerateQR: () => void;
  hapticSuccess: () => void;
};

const AdminQRSection: React.FC<Props> = ({ generatedQRCode, onGenerateQR, hapticSuccess }) => {
  return (
    <>
      <Pressable
        onPress={() => {
          hapticSuccess();
          onGenerateQR();
        }}
        className="mb-6 rounded bg-black py-4"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        <Text className="text-center font-semibold text-white">Generate QR Code</Text>
      </Pressable>

      {generatedQRCode && (
        <View className="mb-6 items-center">
          <View className="rounded-2xl border border-gray-200 bg-white p-6">
            <QRCode value={generatedQRCode} size={200} />
          </View>
        </View>
      )}
    </>
  );
};

export default AdminQRSection;
