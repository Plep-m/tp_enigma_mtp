import React from 'react';
import { View, Text, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  generatedQRCode: string | null;
  onGenerateQR: () => void;
  hapticSuccess: () => void;
};

const AdminQRSection: React.FC<Props> = ({
  generatedQRCode,
  onGenerateQR,
  hapticSuccess
}) => {
  return (
    <>
      <Pressable 
        onPress={() => {
          hapticSuccess();
          onGenerateQR();
        }}
        className="bg-black py-4 rounded mb-6"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <Text className="text-white text-center font-semibold">Generate QR Code</Text>
      </Pressable>

      {generatedQRCode && (
        <View className="items-center mb-6">
          <View className="bg-white p-6 rounded-2xl border border-gray-200">
            <QRCode value={generatedQRCode} size={200} />
          </View>
        </View>
      )}
    </>
  );
};

export default AdminQRSection;
