import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Firebaseの設定をインポート

type Post = {
  id: string;
  userName: string;
  postedAt: { seconds: number };
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  capacity: number;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const fetchedPosts: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      console.log('取得した投稿データ:', fetchedPosts); // デバッグログ
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  if (posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>投稿がありません。</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.date}>
            投稿日：{item.postedAt?.seconds
              ? new Date(item.postedAt.seconds * 1000).toLocaleDateString()
              : '不明'}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});