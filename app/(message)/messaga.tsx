import React, { useState, useCallback, useLayoutEffect } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';



type Message = {
  text: string;
  fromMe: boolean;
  senderName: string;
  timestamp: string;
  avatarUrl?: string;
};

const Chat = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { roomName: roomNameParam } = useLocalSearchParams();
  const [roomName, setRoomName] = useState(typeof roomNameParam === 'string' ? roomNameParam : '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEditingRoomName, setIsEditingRoomName] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <TouchableOpacity onPress={() => router.push({ pathname: '/messageSetting/messageSetting' })}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {roomName || 'チャットルーム'}
          </Text>
        </TouchableOpacity>
      ),
      headerBackTitleVisible: false,
      headerBackTitle: '',
    });
  }, [navigation, roomName, router]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        fromMe: true,
        senderName: '自分',
        timestamp: new Date().toLocaleTimeString(),
        avatarUrl: 'https://example.com/avatar.jpg',
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // ← ここ重要！
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {isEditingRoomName && (
              <View style={{ padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ccc' }}>
                <Text style={{ marginBottom: 5 }}>ルーム名を編集：</Text>
                <TextInput
                  value={roomName}
                  onChangeText={setRoomName}
                  autoFocus
                  onSubmitEditing={() => setIsEditingRoomName(false)}
                  onBlur={() => setIsEditingRoomName(false)}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                  }}
                />
              </View>
            )}
          
          
           

            <ScrollView
              style={styles.messageList}
              contentContainerStyle={{ paddingBottom: 80 }}
              keyboardShouldPersistTaps="handled"
            >
              {messages.map((message, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <View style={{ flexDirection: message.fromMe ? 'row-reverse' : 'row' }}>
                    {message.avatarUrl && (
                      <Image source={{ uri: message.avatarUrl }} style={styles.avatar} />
                    )}
                    <View style={[
                      styles.message,
                      message.fromMe ? styles.myMessage : styles.otherMessage,
                    ]}>
                      <Text style={styles.sender}>{message.senderName}</Text>
                      <Text>{message.text}</Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.timestampOutside,
                    message.fromMe ? { alignSelf: 'flex-end', marginRight: 56 } : { alignSelf: 'flex-start', marginLeft: 56 },
                  ]}>
                    {message.timestamp}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Aa"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <FontAwesome name="send" size={25} color="#DE5656" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  messageList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  message: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  otherMessage: {
    backgroundColor: '#F1F0F0',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  sender: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E1E1E1',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    padding:15,
    marginRight: 10,
    backgroundColor: '#fff',
    height: 40,
    fontSize: 18,
  },
  sendButton: {
    padding: 5,
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
    marginHorizontal: 6,
  },
});

export default Chat;