import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Step } from '../../models/activity';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  remainingSteps: Step[];
  stepIndex: number;
  onSelectStep: (index: number) => void;
};

const PlayItineraryDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  remainingSteps,
  stepIndex,
  onSelectStep,
}) => {
  const insets = useSafeAreaInsets();

  const handleStepSelect = (index: number) => {
    onSelectStep(index);
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 flex-row bg-black/40">
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
        <View
          className="w-72 bg-white shadow-xl"
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,
          }}>
          <View className="flex-row items-center justify-between border-b border-gray-100 px-6 py-4">
            <Text className="text-xl font-bold text-gray-900">Étapes restantes</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={remainingSteps}
            keyExtractor={(item, idx) => `${item.id}-${idx}`}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item, index }) => {
              const absoluteIndex = stepIndex + index;
              const isCurrent = absoluteIndex === stepIndex;

              return (
                <TouchableOpacity
                  onPress={() => handleStepSelect(absoluteIndex)}
                  className={`flex-row items-center border-b border-gray-100 px-6 py-4 ${
                    isCurrent ? 'bg-blue-50' : ''
                  }`}>
                  <View
                    className={`mr-4 h-8 w-8 items-center justify-center rounded-full ${
                      isCurrent ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                    <Text
                      className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-gray-700'}`}>
                      {absoluteIndex + 1}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold ${isCurrent ? 'text-blue-700' : 'text-gray-900'}`}>
                      {item.description}
                    </Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      {item.missions.length} mission{item.missions.length > 1 ? 's' : ''}
                    </Text>
                  </View>

                  {isCurrent && <Text className="ml-2 text-blue-600">→</Text>}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PlayItineraryDrawer;
