// App.tsx (または App.js)

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
  const router = useRouter();
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
        <Text style={styles.title}>プロフィール設定</Text>
            {/*プロフィールの画像を選択できるようにしたいかも*/ }
        <Image source={require('../../assets/images/kumagai.jpg')} style={styles.image} />

          {/* 名前入力フィールド */}
          <Text style={styles.label}>お名前</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName} // 入力が変更されるたびに`name`ステートを更新
            value={name}         // `name`ステートの値を表示
            placeholder="佐藤 正孝"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

<Text style={styles.label}>都道府県</Text>
          {/*　都道府県フィールド */}
          <TextInput
            style={styles.input}
            onChangeText={setPassword} // 入力が変更されるたびに`name`ステートを更新
            value={password}    // `name`ステートの値を表示
            placeholder="都道府県選択"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

 {/*　市区町村フィールド */}
 <Text style={styles.label}>市区町村</Text>
<TextInput
            style={styles.input}
            onChangeText={setPassword} // 入力が変更されるたびに`name`ステートを更新
            value={password}    // `name`ステートの値を表示
            placeholder="市区町村を選択"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

<Text style={styles.label}>自己紹介</Text>
<TextInput
            style={styles.input}
            onChangeText={setPassword} // 入力が変更されるたびに`name`ステートを更新
            value={password}    // `name`ステートの値を表示
            placeholder="市区町村を選択"
            keyboardType="default" // デフォルトのキーボード
            autoCapitalize="words" // 各単語の先頭を大文字に
            autoCorrect={false}   // 入力中の自動修正を無効に
            returnKeyType="done"  // キーボードのEnterキーのラベル
          />

          {/* 送信ボタン */}
          <View style={{ backgroundColor: '#DE5656', borderRadius: 8 ,  width: '80%' }}>
            <Button
              title="アカウント作成"
              onPress={() => router.push({ pathname: '/(tabs)/home', params: { id: '1' } })} // ボタンが押されたら`handleSubmit`関数を実行
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
    paddingTop: '20%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  // titleのスタイル
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DE5656',
  },
  // labelのスタイル
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start', 
    paddingLeft: '10%', // ラベルを左寄せに
    color: '#555',
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
});