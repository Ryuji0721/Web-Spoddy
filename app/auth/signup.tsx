import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }
    setLoading(true);
    try {
      // Firebase Authでユーザー作成
      const userCredential = await createUserWithEmailAndPassword(auth, name, password);
      // Send email verification
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        Alert.alert('確認メール送信', '認証用のメールを送信しました。メールを確認してください。');
      }
      setSubmittedName(name);
      setName('');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      Alert.alert('登録完了', `アカウントが作成されました: ${name}`);
      router.replace('/auth/login');
    } catch (error: any) {
      setLoading(false);
      setError(error.message || 'アカウント作成に失敗しました');
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

          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="メールアドレス"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="パスワード"
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="確認パスワード"
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Button title="アカウントを登録" onPress={handleSubmit} color="#FFFFFF" />
            )}
          </View>

          {submittedName ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>送信されたメールアドレス:</Text>
              <Text style={styles.submittedNameText}>{submittedName}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.linkButton} onPress={() => router.replace('/auth/login')}>
            <Text style={styles.linkButtonText}>アカウントをお持ちの方はこちら</Text>
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
    color: '#555',
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