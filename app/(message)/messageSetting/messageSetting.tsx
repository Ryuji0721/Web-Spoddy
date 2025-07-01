import React, { useState, useLayoutEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MessageSetting = () => {
  const { roomName } = useLocalSearchParams();
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.8)).current;


  const members = [
    { id: '1', name: '山田 太郎' },
    { id: '2', name: '佐藤 花子' },
    { id: '3', name: '鈴木 次郎' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity onPress={showPanel}>
          <Ionicons name="person-outline" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const showPanel = () => {
    setIsPanelVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  const hidePanel = () => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsPanelVisible(false));
  };

  const handleLeaveChat = () => {
    Alert.alert('確認', '本当にチャットから離脱しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '離脱する', style: 'destructive', onPress: () => console.log('チャットから離脱') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomName || 'チャットルーム名'}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>参加メンバー数: </Text>
        <Text style={styles.value}>{members.length} 名</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>通知:</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveChat}>
        <Text style={styles.leaveButtonText}>チャットから離脱する</Text>
      </TouchableOpacity>

      {isPanelVisible && (
       <Animated.View style={[styles.sidePanel, { right: slideAnim }]}>
          <View style={styles.sidePanelHeader}>
            <Text style={styles.sectionTitle}>メンバーリスト</Text>
            <TouchableOpacity onPress={hidePanel}>
              <Text style={{ fontSize: 16 }}>閉じる</Text>
            </TouchableOpacity>
          </View>
          {members.map((member) => (
            <Text key={member.id} style={styles.memberItem}>・{member.name}</Text>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
  },
  leaveButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  memberItem: {
    fontSize: 16,
    paddingVertical: 2,
  },
  sidePanel: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sidePanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default MessageSetting;