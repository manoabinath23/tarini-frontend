import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={{
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: focused ? Colors.primary : 'transparent',
      borderRadius: 16,
    }}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        tabBarStyle: {
          backgroundColor: Colors.secondary,
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditation',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🧘" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="bat"
        options={{
          title: 'BAT',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          tabBarIcon: ({ focused }) => <TabIcon emoji="😊" focused={focused} />,
        }}
      />
    </Tabs>
  );
}