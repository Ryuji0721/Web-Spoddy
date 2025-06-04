import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const placeholderImage = require('../../assets/placeholder.png'); 

export default function ExploreScreen() {
  const [formData, setFormData] = useState({
    prefecture: '',
    city: '',
    participants: '',
    description: '',
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false); 

  const [uploadedImages, setUploadedImages] = useState<string[]>(['', '', '']); 

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios'); 
    setSelectedDate(currentDate);
  };

  const pickImage = async (index: number) => {
    Alert.alert(
      "画像アップロード",
      "この機能は現在ダミーです。実際に画像を選択・アップロードするロジックを実装してください。",
      [{ text: "OK" }]
    );
  };

  const handleSubmit = () => {
    if (!formData.prefecture || !formData.city || !formData.participants || !formData.description) {
      Alert.alert("エラー", "全ての必須項目を入力してください。");
      return;
    }
    console.log('フォームデータ:', { ...formData, selectedDate: selectedDate?.toLocaleString() });
    Alert.alert('募集内容を送信しました！', 'データがコンソールに出力されました。');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Image source={placeholderImage} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>目黒はるき</Text>
            <Text style={styles.postDate}>投稿日：2025年12月25日</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>投稿する</Text>
        </TouchableOpacity>
      </View>

      {/* タグ行 */}
      <View style={styles.tagRow}>
        <Text style={styles.tag}>📍 東京都渋谷区</Text>
        <Text style={styles.tag}>📅 2025年6月5日</Text>
        <Text style={styles.tag}>🕒 13:00時</Text>
      </View>

      {/* フォームコンテナ */}
      <View style={styles.formContainer}>
        {/* 都道府県と市区町村の選択行 */}
        <View style={styles.row}>
          <View style={styles.pickerWrapper}>
            <Picker
              enabled={true}
              selectedValue={formData.prefecture}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('prefecture', value)}
              itemStyle={styles.pickerItem} 
              // ★ iOSでdropdownは避け、デフォルトのdialogに任せるか明示的にdialogにする
              mode={Platform.OS === 'ios' ? 'dialog' : 'dialog'} // iOSでもdialogを推奨
            >
              <Picker.Item label="都道府県を選択" value="" />
              <Picker.Item label="東京都" value="東京都" />
              <Picker.Item label="大阪府" value="大阪府" />
              <Picker.Item label="福岡県" value="福岡県" />
              {/* 他の都道府県を追加 */}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              enabled={true}
              selectedValue={formData.city}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('city', value)}
              itemStyle={styles.pickerItem}
              // ★ iOSでdropdownは避け、デフォルトのdialogに任せるか明示的にdialogにする
              mode={Platform.OS === 'ios' ? 'dialog' : 'dialog'} // iOSでもdialogを推奨
            >
              <Picker.Item label="市区町村を選択" value="" />
              <Picker.Item label="渋谷区" value="渋谷区" />
              <Picker.Item label="新宿区" value="新宿区" />
              <Picker.Item label="中央区" value="中央区" />
              {/* 他の市区町村を追加 */}
            </Picker>
          </View>
        </View>

        {/* 日付と時間帯選択フィールド */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={selectedDate ? styles.inputText : styles.placeholderText}>
            {selectedDate ? selectedDate.toLocaleString() : '日付と時間帯を選択'}
          </Text>
        </TouchableOpacity>

        {/* 募集人数入力フィールド */}
        <TextInput
          style={styles.input}
          placeholder="募集人数"
          keyboardType="numeric" 
          value={formData.participants}
          onChangeText={(text) => handleInputChange('participants', text.replace(/[^0-9]/g, ''))} 
          placeholderTextColor="#999" // プレースホルダーのテキスト色を設定
        />
        {/* 募集内容詳細入力フィールド */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="募集内容を詳しく入力してください。"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999" // プレースホルダーのテキスト色を設定
        />
        {/* 画像アップロード行 */}
        <View style={styles.imageUploadRow}>
          {uploadedImages.map((uri, index) => (
            <TouchableOpacity key={index} style={styles.imageUploadBox} onPress={() => pickImage(index)}>
              {uri ? (
                <Image source={{ uri }} style={styles.uploadedImage} />
              ) : (
                <>
                  <Text style={styles.cameraIcon}>📷</Text>
                  <Text style={styles.plusIcon}>＋</Text>
                </>
              )}
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
    backgroundColor: '#F7F7F7',
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
    fontSize: 28,
    color: '#333', 
    fontWeight: '300',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
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
    backgroundColor: '#CCC',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#DE5656', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 13,
    color: '#333', 
    overflow: 'hidden',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    marginHorizontal: 4,
    // overflow: 'hidden', // ★一時的にコメントアウトしてテスト
    height: 50, // ★高さを50に修正
    justifyContent: 'center',
    zIndex: 999 // ★最前面に表示
  },
  picker: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent', // ★デバッグ用
    // color: '#000', // ★ここでのcolorはiOSのPickerテキストには影響しないため削除推奨
  },
  pickerItem: {
    color: '#353535', // ★一時的に非常に目立つ色にする
    fontSize: 15, // ★一時的に大きめのサイズにする
    top: Platform.OS === 'ios' ? -85 : 0, // ★iOSでの位置調整
    backgroundColor: 'transparent', // 背景色を透明に設定
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  inputText: { 
    color: '#000',
    fontSize: 16,
  },
  placeholderText: { 
    color: '#999',
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  imageUploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  imageUploadBox: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden',
  },
  cameraIcon: {
    fontSize: 24,
    color: '#666',
  },
  plusIcon: {
    fontSize: 28,
    color: '#666',
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 2,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});