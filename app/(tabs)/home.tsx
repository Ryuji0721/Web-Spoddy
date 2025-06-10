import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const name = 'スッポディー';
  const description = 'これはアプリのホーム画面です。';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>名前：</Text>
      <Text style={styles.value}>{name}</Text>

      <Text style={styles.label}>説明：</Text>
      <Text style={styles.value}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});