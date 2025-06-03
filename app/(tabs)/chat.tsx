import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

const ChatTabs = () => {
  const roomCount = 6;

  const router = useRouter();

  const [messages, setMessages] = useState<Array<Array<{ text: string; sender: string }>>>(
    () => Array.from({ length: roomCount }, () => [])
  );

  const [inputs, setInputs] = useState(() => Array(roomCount).fill(''));
  const [visible, setVisible] = useState(() => Array(roomCount).fill(true));

  const handleSend = (index: number) => {
    if (!inputs[index].trim()) return;
    const newMessages = [...messages];
    newMessages[index] = [...newMessages[index], { text: inputs[index], sender: 'You' }];
    setMessages(newMessages);

    const newInputs = [...inputs];
    newInputs[index] = '';
    setInputs(newInputs);
  };

  const toggleVisibility = (index: number) => {
    const newVisible = [...visible];
    setVisible(newVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {Array.from({ length: roomCount }).map((_, i) => (
          <View style={styles.header} key={i}>
            <TouchableOpacity style={styles.room} onPress={() => router.push({ pathname: '/(message)/messaga', params: { id: (i + 1).toString() } })}>
                <Image source={require('@/assets/images/kumagai.jpg')} style={styles.Image} />
                <Text style={styles.title}>渋谷 バスケットコート {i + 1}</Text>               
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f8f8f8',
    paddingTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
    Image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
  room: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 100,
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleButton: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  messagesContainer: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  message: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatTabs;