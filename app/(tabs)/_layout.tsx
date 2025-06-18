import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'アカウント',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'ログイン',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lock-open-variant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '投稿',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'チャット',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-processing" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: 'マイページ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
