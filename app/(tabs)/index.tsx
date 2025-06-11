import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (name.trim() === '') {
      Alert.alert('エラー', 'メールアドレスを入力してください。');
      return;
    }
    if (password.trim() === '') {
      Alert.alert('エラー', 'パスワードを入力してください。');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致しません。');
      return;
    }

    setSubmittedName(name);
    setName('');
    setPassword('');
    setConfirmPassword('');
    Alert.alert('送信完了', `入力されたメールアドレス: ${name}`);
    router.push({ pathname: '/start/plofileSetting', params: { id: '1' } });
  };

  return (
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

          <View style={styles.buttonContainer}>
            <Button title="アカウントを登録" onPress={handleSubmit} color="#FFFFFF" />
          </View>

          {submittedName ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>送信されたメールアドレス:</Text>
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