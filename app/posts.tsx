import React from 'react';
import { Button, Alert } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Firebase 初期化ファイル

const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      userName: '目黒はるき',
      postedAt: serverTimestamp(), // FirestoreのTimestamp型を使用
      title: 'テニス仲間募集！',
      description: '初心者歓迎！楽しくテニスしませんか？',
      location: '東京都渋谷区',
      date: '2025-06-05',
      time: '13:00',
      participants: 2,
      capacity: 5,
    });
    Alert.alert('投稿が成功しました！', `ドキュメントID: ${docRef.id}`);
  } catch (error) {
    console.error('投稿に失敗しました:', error);
    Alert.alert('エラー', '投稿に失敗しました。');
  }
};

export default function PostForm() {
  return (
    <Button title="投稿する" onPress={handleSubmit} />
  );
}