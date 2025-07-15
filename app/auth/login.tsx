import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');
    if (name.trim() === '') {
      setError('メールアドレスを入力してください。');
      return;
    }
    if (password.trim() === '') {
      setError('パスワードを入力してください。');
      return;
    }
    setLoading(true);
    try {
      // Firebase Authでログイン
      await signInWithEmailAndPassword(auth, name, password);
      setSubmittedName(name);
      setName('');
      setPassword('');
      setLoading(false);
      Alert.alert('ログイン成功', `ログインしました: ${name}`);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      setLoading(false);
      setError(error.message || 'ログインに失敗しました');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Spoddy</Text>
          <Text style={[styles.label, { textAlign: 'center' }]}>一緒にスポーツを楽しむ仲間を見つけよう</Text>

          <Text style={styles.label}></Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="メールアドレス"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="パスワード"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            secureTextEntry={true}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Button
                title="ログイン"
                onPress={handleSubmit}
                color="#FFFFFF"
              />
            )}
          </View>

          {submittedName ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>送信された名前:</Text>
              <Text style={styles.submittedNameText}>{submittedName}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.linkButton} onPress={() => router.replace('/auth/signup')}>
            <Text style={styles.linkButtonText}>アカウントをお持ちでない方はこちら</Text>
          </TouchableOpacity>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#DE5656',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
    color: '#555',
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#DE5656',
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DE5656',
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#DE5656',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  buttonContainer: {
    backgroundColor: '#DE5656',
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
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
  errorText: {
    color: '#DE5656',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 