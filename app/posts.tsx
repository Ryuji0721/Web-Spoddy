import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Firebase 初期化ファイル

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !location || !date || !time || !capacity) {
      Alert.alert('エラー', '全ての項目を入力してください');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        userName: '目黒はるき',
        postedAt: serverTimestamp(),
        title,
        description,
        location,
        date,
        time,
        participants: 1,
        capacity: parseInt(capacity),
      });
      Alert.alert('投稿が成功しました！', `ドキュメントID: ${docRef.id}`);
      // フォームのリセット
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      setTime('');
      setCapacity('');
    } catch (error) {
      console.error('投稿に失敗しました:', error);
      Alert.alert('エラー', '投稿に失敗しました。');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="タイトル" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="説明" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="場所" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="日付 (例: 2025-06-05)" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="時間 (例: 13:00)" value={time} onChangeText={setTime} />
      <TextInput style={styles.input} placeholder="定員" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
      <Button title="投稿する" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
});
