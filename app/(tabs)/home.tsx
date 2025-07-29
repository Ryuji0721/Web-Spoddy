import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native';
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
  imageUrl?: string; // 画像URLはオプション
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const fetchedPosts: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      
      // 投稿日時でソート（新しい順）
      const sortedPosts = fetchedPosts.sort((a, b) => {
        const timeA = a.postedAt?.seconds || 0;
        const timeB = b.postedAt?.seconds || 0;
        return timeB - timeA; // 降順ソート（新しいものが上）
      });
      
      console.log('取得した投稿データ:', sortedPosts); // デバッグログ
      setPosts(sortedPosts);
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
          {/* ヘッダー部分 */}
          <View style={styles.cardHeader}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {item.userName ? item.userName.charAt(0) : 'U'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{item.userName || '匿名ユーザー'}</Text>
                <Text style={styles.postedDate}>
                  {item.postedAt?.seconds
                    ? new Date(item.postedAt.seconds * 1000).toLocaleDateString('ja-JP', {
                        month: 'numeric',
                        day: 'numeric',
                      })
                    : '不明'}
                </Text>
              </View>
            </View>
          </View>

          {/* タイトル */}
          <Text style={styles.title}>{item.title}</Text>

          {/* 画像 */}
          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          {/* 説明文 */}
          <Text style={styles.description}>{item.description}</Text>

          {/* 詳細情報 */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📍</Text>
              </View>
              <Text style={styles.detailText}>{item.location || '未設定'}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📅</Text>
              </View>
              <Text style={styles.detailText}>
                {item.date || '未設定'} {item.time || '未設定'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>👥</Text>
              </View>
              <Text style={styles.detailText}>
                募集人数: {item.participants || '未設定'}人
              </Text>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  container: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  postedDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    fontSize: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});