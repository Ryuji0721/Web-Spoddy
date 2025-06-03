import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 🔄 入力欄にフォーカス中は TabBar を非表示にする
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarStyle: isInputFocused
          ? { display: 'none' }
          : Platform.select({
              ios: { position: 'absolute' },
              default: {},
            }),
      });
    }, [isInputFocused])
  );

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Text style={styles.title}>バスケ同好会</Text>
        <ScrollView
          style={{maxHeight: '80%', paddingHorizontal: 20,}}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
          {messages.map((message, index) => (
            <View key={index} style={styles.message}>
              <Text>{message}</Text>
            </View>
          ))}
        </ScrollView>
          <SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="メッセージを入力"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <Button title="送信" onPress={handleSendMessage} />
        </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  messagesContainer: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    marginBottom: 10,
  },
  inputContainer: {
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E1E1E1',
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    height: 40,
  },
});

export default Chat;