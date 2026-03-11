import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import AdminView from '../views/AdminView';
import { Activity, createBlankActivity } from '../models/admin';
import { encodeActivity, decodeActivity } from '../models/qrcode';

const AdminController: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [generatedQRCode, setGeneratedQRCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleUpdateActivity = (updatedActivity: Activity) => {
    setActivity(updatedActivity);
    setGeneratedQRCode(null);
  };

  const handleGenerateQR = () => {
    if (!activity) return;
    try {
      const encoded = encodeActivity(activity);
      setGeneratedQRCode(encoded);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code');
    }
  };

  const handleScan = (data: string) => {
    try {
      const decoded = decodeActivity<Activity>(data);
      setActivity(decoded);
      setGeneratedQRCode(null);
      setIsScanning(false);
      Alert.alert('Success', 'Activity loaded from QR code!');
    } catch (error) {
      Alert.alert('Error', 'Invalid QR code format');
      setIsScanning(false);
    }
  };

  const handleCreateBlank = () => {
    setActivity(createBlankActivity());
    setGeneratedQRCode(null);
  };

  return (
    <SafeAreaProvider>
      <AdminView
        activity={activity}
        generatedQRCode={generatedQRCode}
        isScanning={isScanning}
        onUpdateActivity={handleUpdateActivity}
        onGenerateQR={handleGenerateQR}
        onStartScanning={() => setIsScanning(true)}
        onScan={handleScan}
        onCloseScanner={() => setIsScanning(false)}
        onCreateBlank={handleCreateBlank}
      />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
};

export default AdminController;