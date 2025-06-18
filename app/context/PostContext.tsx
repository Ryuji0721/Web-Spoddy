import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

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

type PostContextType = {
  posts: Post[];
};

const PostContext = createContext<PostContextType>({ posts: [] });

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      console.log('リアルタイムデータ:', postData); // デバッグ用ログ
      setPosts(postData);
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  return <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);

export default function HomeScreen() {
  const { posts } = usePostContext(); // PostContextから投稿データを取得

  console.log('ホーム画面の投稿データ:', posts); // デバッグ用ログ

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
      renderItem={({ item }: { item: Post }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
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