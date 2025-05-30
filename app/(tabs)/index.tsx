// App.tsx (または App.js)

import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  // 入力フィールドの値を管理するState
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // 送信された名前を表示するためのState
  const [submittedName, setSubmittedName] = useState('');

  // ボタンが押されたときのハンドラ
  const handleSubmit = () => {
    if (name.trim() === '') {
      Alert.alert('エラー', 'メールアドレスを入力してください。');
      return;
    }
    setSubmittedName(name);
    setName(''); // 入力フィールドをクリア
    Alert.alert('送信完了', `入力された名前: ${name}`);
  };

  return (
    // キーボードが表示されたときにUIが隠れないように調整
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Spoddy</Text>
          <Text style={[styles.label, { textAlign: 'center' }]}>
            一緒にスポーツを楽しむ仲間を見つけよう
          </Text>

          

          {/* 名前入力フィールド */}
          <Text style={styles.label}></Text>
          <TextInput
            style={styles.input}
            onChangeText={setName} // 入力が変更されるたびに`name`ステートを更新
            value={name}         // `name`ステートの値を表示
            placeholder="メールアドレス"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

          {/* パスワード入力フィールド */}
          <TextInput
            style={styles.input}
            onChangeText={setPassword} // 入力が変更されるたびに`name`ステートを更新
            value={password}    // `name`ステートの値を表示
            placeholder="パスワード"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

          {/* 確認パスワード */}
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword} // 入力が変更されるたびに`name`ステートを更新
            value={confirmPassword}         // `name`ステートの値を表示
            placeholder="確認パスワード"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

          {/* 送信ボタン */}
          <View style={{ backgroundColor: '#DE5656', borderRadius: 8 ,  width: '80%' }}>
            <Button
              title="アカウントを登録"
              onPress={handleSubmit} // ボタンが押されたら`handleSubmit`関数を実行
              color="#FFFFFF" // ボタンの色 
            />
          </View>

          {/* 送信された名前の表示 */}
          {submittedName ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>送信された名前:</Text>
              <Text style={styles.submittedNameText}>{submittedName}</Text>
            </View>
          ) : null}

          
        <Text style={styles.link}>アカウントをお持ちの方はこちら</Text>
        </ScrollView>
       
          
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flexGrow: 1, // コンテンツが少ない場合でもScrollViewがフルサイズになるように
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  // titleのスタイル
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#DE5656',
  },
  // labelのスタイル
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start', // ラベルを左寄せに
    width: '100%', 
    color: '#555',
    textAlign: 'center', // 中央寄せ
  },
  // linkのスタイル
  link: {
    fontSize: 16,
    color: '#DE5656',
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center', // 中央寄せ
  },
  jump: {
    fontSize: 16,
    color: '#DE5656',
    textDecorationLine: 'underline',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    color: '#333',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e9f7ef',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    borderColor: '#d0eadb',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  submittedNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
});