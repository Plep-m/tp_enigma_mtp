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
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row bg-black/40">
        {/* Tap outside to close */}
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Drawer Panel - Safe Area Aware */}
        <View
          className="w-72 bg-white shadow-xl"
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,
          }}
        >
          {/* Drawer Header */}
          <View className="px-6 py-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-xl font-bold text-gray-900">Étapes restantes</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-2xl">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Steps List */}
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
                  className={`px-6 py-4 border-b border-gray-100 flex-row items-center ${
                    isCurrent ? 'bg-blue-50' : ''
                  }`}
                >
                  {/* Step Indicator */}
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center mr-4 ${
                      isCurrent ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <Text
                      className={`font-bold text-sm ${
                        isCurrent ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {absoluteIndex + 1}
                    </Text>
                  </View>

                  {/* Step Info */}
                  <View className="flex-1">
                    <Text
                      className={`font-semibold ${
                        isCurrent ? 'text-blue-700' : 'text-gray-900'
                      }`}
                    >
                      {item.description}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">
                      {item.missions.length} mission{item.missions.length > 1 ? 's' : ''}
                    </Text>
                  </View>

                  {/* Current Indicator */}
                  {isCurrent && <Text className="text-blue-600 ml-2">→</Text>}
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
