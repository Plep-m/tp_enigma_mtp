import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import AdminView from '../views/AdminView';
import { Activity } from '../models/activity';
import { createBlankActivity } from '../models/admin';
import { encodeActivity, decodeActivity } from '../models/qrcode';
import { useActivities } from '../hooks/useActivities';

const AdminController: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [generatedQRCode, setGeneratedQRCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const { saveActivity } = useActivities();

  const handleUpdateActivity = (updatedActivity: Activity) => {
    setActivity(updatedActivity);
    setGeneratedQRCode(null);
  };

  const handleGenerateQR = async () => {
    if (!activity) return;
    try {
      const activityToSave = { ...activity, source: 'admin' as const };
      await saveActivity(activityToSave, 'admin');
      const encoded = encodeActivity(activityToSave);
      setGeneratedQRCode(encoded);

      Alert.alert('Success', 'Activity saved and QR code generated!');
    } catch {
      Alert.alert('Error', 'Failed to generate QR code');
    }
  };

  const handleScan = (data: string) => {
    setIsScanning(false);
    try {
      const decoded = decodeActivity<Activity>(data);
      setActivity({ ...decoded, source: 'admin' as const });
      setGeneratedQRCode(null);
      Alert.alert('Success', 'Activity loaded from QR code!');
    } catch {
      Alert.alert('Error', 'Invalid QR code format');
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
