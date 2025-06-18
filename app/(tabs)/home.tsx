import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { usePostContext } from '../context/PostContext'; // PostContextからデータを取得

type Post = {
  id: string;
  userName: string; // ユーザー名
  postedAt: { seconds: number }; // 投稿日時
  title: string; // タイトル
  description: string; // 説明
  location: string; // 場所
  date: string; // 日付
  time: string; // 時間
  participants: number; // 参加人数
  capacity: number; // 定員
};

export default function HomeScreen() {
  const { posts } = usePostContext(); // PostContextから投稿データを取得

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
      renderItem={({ item }: { item: Post }) => ( // Post型を明示
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.userName}</Text>
              <Text style={styles.date}>
                投稿日：{item.postedAt?.seconds
                  ? new Date(item.postedAt.seconds * 1000).toLocaleDateString()
                  : '不明'}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoItem}>📍 {item.location}</Text>
            <Text style={styles.infoItem}>📅 {item.date}</Text>
            <Text style={styles.infoItem}>🕒 {item.time}時</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.participants}>
              👥 {item.participants}/{item.capacity}人
            </Text>
            <View style={styles.chatButton}>
              <Text style={styles.chatButtonText}>💬 チャットに参加</Text>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
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
    fontSize: 16,
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
