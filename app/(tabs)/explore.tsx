import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ExploreScreen() {
  const [formData, setFormData] = useState({
    prefecture: '',
    city: '',
    dateTime: '',
    participants: '',
    description: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('フォームデータ:', formData);
    alert('募集内容を送信しました！');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Image source={require('../../assets/placeholder.png')} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>目黒はるき</Text>
            <Text style={styles.postDate}>投稿日：2025年12月25日</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>投稿する</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagRow}>
        <Text style={styles.tag}>📍 東京都渋谷区</Text>
        <Text style={styles.tag}>📅 2025年6月5日</Text>
        <Text style={styles.tag}>🕒 13:00時</Text>
      </View>

      {/* フォーム */}
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Picker
            selectedValue={formData.prefecture}
            style={styles.picker}
            onValueChange={(value) => handleInputChange('prefecture', value)}
          >
            <Picker.Item label="都道府県" value="" />
            <Picker.Item label="東京都" value="東京都" />
            <Picker.Item label="大阪府" value="大阪府" />
            {/* 他の都道府県を追加 */}
          </Picker>
          <Picker
            selectedValue={formData.city}
            style={styles.picker}
            onValueChange={(value) => handleInputChange('city', value)}
          >
            <Picker.Item label="市区町村" value="" />
            <Picker.Item label="渋谷区" value="渋谷区" />
            <Picker.Item label="新宿区" value="新宿区" />
            {/* 他の市区町村を追加 */}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="日付と時間帯"
          value={formData.dateTime}
          onChangeText={(text) => handleInputChange('dateTime', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="募集人数"
          value={formData.participants}
          onChangeText={(text) => handleInputChange('participants', text)}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="入力してください。"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline
        />
        <View style={styles.imageUploadRow}>
          {[0, 1, 2].map((_, index) => (
            <TouchableOpacity key={index} style={styles.imageUploadBox}>
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={styles.plusIcon}>＋</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 30,
  },
  closeButton: {
    fontSize: 24,
    color: '#000',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  imageUploadBox: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 20,
    color: '#999',
  },
  plusIcon: {
    fontSize: 24,
    color: '#999',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  participants: {
    fontSize: 14,
    color: '#444',
  },
  chatButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
