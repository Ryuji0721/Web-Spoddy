import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase'; // Firebaseの設定をインポート
import {
  collection,
  onSnapshot,
  addDoc, // ★ addDoc をインポート
  Timestamp, // ★ FirestoreのTimestamp型を扱うためにインポート
} from 'firebase/firestore';

// ★ 1. Post の型定義をより正確に修正 (特に postedAt)
type Post = {
  id: string;
  userName: string;
  postedAt: Timestamp; // Firestoreから取得する際はTimestampオブジェクトになります
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  capacity: number;
};

// ★ 2. 新しい投稿データのための型定義 (idとpostedAtは挿入時に自動生成されるため不要)
type NewPostData = Omit<Post, 'id' | 'postedAt'>;

// ★ 3. PostContextType に createPost 関数を追加
type PostContextType = {
  posts: Post[];
  createPost: (postData: NewPostData) => Promise<string | undefined>; // 戻り値は新しく作成されたドキュメントのID
};

// ★ 4. createContext の初期値にも createPost のダミー関数を追加
const PostContext = createContext<PostContextType>({
  posts: [],
  createPost: async () => undefined, // ダミー関数
});

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // リアルタイムリスナーのセットアップ (読み取り機能)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      // TypeScript の型安全性を高めるため、doc.data() の結果を明示的にキャスト
      const postData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userName: data.userName,
          postedAt: data.postedAt, // これはFirestoreのTimestampオブジェクトです
          title: data.title,
          description: data.description,
          location: data.location,
          date: data.date,
          time: data.time,
          participants: data.participants,
          capacity: data.capacity,
        } as Post; // 強制的にPost型にキャスト
      });
      console.log('リアルタイムデータ:', postData); // デバッグ用ログ
      setPosts(postData);
    });

    return () => unsubscribe(); // クリーンアップ関数
  }, []);

  // ★ 5. createPost 関数を定義 (書き込み機能)
  const createPost = async (postData: NewPostData) => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        ...postData,
        postedAt: Timestamp.now(), // 現在時刻をFirestoreのTimestampとして設定
        // または `new Date()` でもFirestoreが自動でTimestampに変換します
      });
      console.log('新しいドキュメントが追加されました。ID:', docRef.id);
      return docRef.id; // 作成されたドキュメントのIDを返す
    } catch (e) {
      console.error('ドキュメントの追加中にエラーが発生しました: ', e);
      // エラー処理を適切に行う（例: ユーザーに通知するなど）
      return undefined;
    }
  };

  // ★ 6. Context Provider の value に createPost を含める
  return <PostContext.Provider value={{ posts, createPost }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
