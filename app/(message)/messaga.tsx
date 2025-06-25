import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

type Message = {
  text: string;
  fromMe: boolean;
  senderName: string;
  timestamp: string;
  avatarUrl?: string;
};

const Chat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 入力欄にフォーカス中は TabBar を非表示にする
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
    }, [isInputFocused, navigation])
  );

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        fromMe: true,
        senderName: '自分',
        timestamp: new Date().toLocaleTimeString(),
        avatarUrl: 'https://ferret.akamaized.net/uploads/article/6989/eyecatch/default-35960e468ba627228e193e5b2c42c1f1.jpg',
      };
      setMessages([...messages, newMessage]);
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
          style={{ maxHeight: '80%', paddingHorizontal: 20 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
          {messages.map((message, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: message.fromMe ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                {message.avatarUrl && (
                  <View style={{ marginHorizontal: 6 }}>
                    <Image
                      source={{ uri: message.avatarUrl }}
                      style={styles.avatar}
                    />
                  </View>
                )}
                <View
                  style={[
                    styles.message,
                    message.fromMe ? styles.myMessage : styles.otherMessage,
                  ]}
                >
                  <Text style={styles.sender}>{message.senderName}</Text>
                  <Text>{message.text}</Text>
                  <View style={message.fromMe ? styles.bubbleTailRight : styles.bubbleTailLeft} />
                </View>
              </View>
              <Text
                style={[
                  styles.timestampOutside,
                  message.fromMe ? { alignSelf: 'flex-end', marginRight: 56 } : { alignSelf: 'flex-start', marginLeft: 56 },
                ]}
              >
                {message.timestamp}
              </Text>
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
            <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
              <FontAwesome name="send" size={20} color="#007AFF" />
            </TouchableOpacity>
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
  message: {
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginRight: 10,
    position: 'relative',
  },
  otherMessage: {
    backgroundColor: '#F1F0F0',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginLeft: 10,
    position: 'relative',
  },
  sender: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#fff',
    height: 40,
  },
  sendButton: {
    padding: 10,
  },
  bubbleTailRight: {
    position: 'absolute',
    right: -6,
    top: 10,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    borderLeftWidth: 6,
    borderLeftColor: '#DCF8C6',
  },
  bubbleTailLeft: {
    position: 'absolute',
    left: -6,
    top: 10,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    borderRightWidth: 6,
    borderRightColor: '#F1F0F0',
  },
  timestampOutside: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 24,
  },
});

export default Chat;
