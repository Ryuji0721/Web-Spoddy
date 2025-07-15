import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Firebase設定ファイルをインポート

type Room = {
  roomId: string;
  roomName: string;
  imageUrl?: string; // ルームの画像URL（任意）
};

const ChatTabs = () => {
  const [rooms, setRooms] = useState<Room[]>([]); // チャットルーム一覧を管理
  const router = useRouter();

  // Firestoreからチャットルーム一覧を取得
  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomDocs = await getDocs(roomsCollection);
      const fetchedRooms = roomDocs.docs.map((doc) => ({
        roomId: doc.id,
        ...doc.data(),
      })) as Room[];
      setRooms(fetchedRooms);
    };

    fetchRooms();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {rooms.map((room) => (
          <View style={styles.header} key={room.roomId}>
            <TouchableOpacity
              style={styles.room}
              onPress={() => router.push({ pathname: '/(message)/messaga', params: { roomName: room.roomId } })}
            >
              <Image
                source={room.imageUrl ? { uri: room.imageUrl } : require('@/assets/images/kumagai.jpg')}
                style={styles.Image}
              />
              <Text style={styles.title}>{room.roomName}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
});

export default ChatTabs;