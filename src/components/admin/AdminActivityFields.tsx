import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Activity } from '../../models/activity';

type Props = {
  activity: Activity;
  onUpdateActivity: (activity: Activity) => void;
  hapticLight: () => void;
};

const AdminActivityFields: React.FC<Props> = ({ activity, onUpdateActivity, hapticLight }) => {
  return (
    <>
      <View className="mb-6">
        <Text className="mb-2 text-sm font-semibold text-gray-700">Title</Text>
        <TextInput
          value={activity.title}
          onChangeText={(text) => onUpdateActivity({ ...activity, title: text })}
          onFocus={hapticLight}
          className="rounded border border-gray-300 px-3 py-2"
          placeholder="Activity Title"
          returnKeyType="next"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-sm font-semibold text-gray-700">Description</Text>
        <TextInput
          value={activity.description}
          onChangeText={(text) => onUpdateActivity({ ...activity, description: text })}
          onFocus={hapticLight}
          className="rounded border border-gray-300 px-3 py-2"
          placeholder="Activity Description"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-sm font-semibold text-gray-700">Image URL</Text>
        <TextInput
          value={activity.image}
          onChangeText={(text) => onUpdateActivity({ ...activity, image: text })}
          onFocus={hapticLight}
          className="rounded border border-gray-300 px-3 py-2"
          placeholder="https://example.com/image.jpg"
          returnKeyType="next"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-sm font-semibold text-gray-700">Category</Text>
        <TextInput
          value={activity.category || ''}
          onChangeText={(text) => onUpdateActivity({ ...activity, category: text })}
          onFocus={hapticLight}
          className="rounded border border-gray-300 px-3 py-2"
          placeholder="e.g. History, Nature, Art"
          returnKeyType="next"
        />
      </View>

      <View className="mb-6 flex-row gap-4">
        <View className="flex-1">
          <Text className="mb-2 text-sm font-semibold text-gray-700">Duration (min)</Text>
          <TextInput
            value={activity.duration ? String(activity.duration) : ''}
            onChangeText={(text) =>
              onUpdateActivity({ ...activity, duration: parseInt(text) || undefined })
            }
            onFocus={hapticLight}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="30"
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-sm font-semibold text-gray-700">Level</Text>
          <TextInput
            value={activity.level || ''}
            onChangeText={(text) => onUpdateActivity({ ...activity, level: text })}
            onFocus={hapticLight}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="e.g. Beginner"
            returnKeyType="next"
          />
        </View>
      </View>
    </>
  );
};

export default AdminActivityFields;
