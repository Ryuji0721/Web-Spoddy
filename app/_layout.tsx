import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PostProvider } from './context/PostContext';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,  // デフォルトは非表示
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="message"
            options={{
              headerShown: true,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </PostProvider>
  );
}