import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Firebase 初期化ファイルの正しいパス

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
      } catch (error) {
        console.error('投稿の取得に失敗しました:', error);
        Alert.alert('エラー', '投稿の取得に失敗しました。');
      }
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>投稿がありません。</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((post) => (
        <View style={styles.card} key={post.id}>
          <View style={styles.header}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.name}>{post.userName}</Text>
              <Text style={styles.date}>
                投稿日：{post.postedAt?.seconds
                  ? new Date(post.postedAt.seconds * 1000).toLocaleDateString()
                  : '不明'}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoItem}>📍 {post.location}</Text>
            <Text style={styles.infoItem}>📅 {post.date}</Text>
            <Text style={styles.infoItem}>🕒 {post.time}時</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.participants}>
              👥 {post.participants}/{post.capacity}人
            </Text>
            <View style={styles.chatButton}>
              <Text style={styles.chatButtonText}>💬 チャットに参加</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 12,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participants: {
    fontSize: 12,
    color: '#555',
  },
  chatButton: {
    backgroundColor: '#DE5656',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  chatButtonText: {
    fontSize: 12,
    color: '#fff',
  },
});