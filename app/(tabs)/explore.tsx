<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Collapsible from "react-native-collapsible";
import * as ImagePicker from "expo-image-picker";

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "支援県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const cities: Record<string, string[]> = {
  北海道: ["札幌市", "函館市", "小樽市"],
  青森県: ["青森市", "弘前市", "八戸市"],
  東京都: ["千代田区", "中央区", "港区", "新宿区", "渋谷区", "豊島区", "板橋区", "練馬区", "その他"], // 'その他'を追加
  大阪府: ["大阪市", "堺市", "岸和田市", "その他"],
  福岡県: ["福岡市", "北九州市", "久留米市", "大牟田市", "その他"] // 'その他'を追加
  // 他の都道府県に対応する都市データも追加する
};

export default function ExploreScreen() {
  const [formData, setFormData] = useState({
    prefecture: "",
    city: "",
    dateTime: "",
    participants: "",
    description: "",
  });

  const [isPrefectureAccordionOpen, setIsPrefectureAccordionOpen] = useState(false);
  const [isCityAccordionOpen, setIsCityAccordionOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handlePrefectureChange = (value: string) => {
    setFormData((prev) => ({ ...prev, prefecture: value, city: "" }));
    setIsPrefectureAccordionOpen(false);
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
    setIsCityAccordionOpen(false);
  };

=======
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

>>>>>>> 0849e68 (fix:投稿ページ)
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

<<<<<<< HEAD
  const handleImagePick = async () => {
    if (images.length >= 3) {
      Alert.alert("写真は最大3枚までアップロードできます。");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.prefecture) {
      Alert.alert("エラー", "都道府県を選択してください。");
      return;
    }
    if (!formData.city) {
      Alert.alert("エラー", "市区町村を選択してください。");
      return;
    }
    if (!formData.dateTime) {
      Alert.alert("エラー", "日付と時間帯を入力してください。");
      return;
    }
    if (!formData.participants) {
      Alert.alert("エラー", "募集人数を入力してください。");
      return;
    }
    if (!formData.description) {
      Alert.alert("エラー", "募集内容を入力してください。");
      return;
    }

    console.log("フォームデータ:", formData);
    console.log("アップロードされた写真:", images);
    Alert.alert("募集内容を送信しました！", "データがコンソールに出力されました。");
    setFormData({
      prefecture: "",
      city: "",
      dateTime: "",
      participants: "",
      description: "",
    });
    setImages([]);
  };

  const availableCities = formData.prefecture ? cities[formData.prefecture] || [] : [];

  return (
    <View style={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>投稿する</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <TouchableOpacity
            onPress={() => setIsPrefectureAccordionOpen(!isPrefectureAccordionOpen)}
            style={styles.accordionHeader}
          >
            <Text style={styles.label}>
              {formData.prefecture ? formData.prefecture : "都道府県を選択してください ▼"} 
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={!isPrefectureAccordionOpen}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.prefecture}
                onValueChange={handlePrefectureChange}
                mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="都道府県を選択" value="" />
                {prefectures.map((pref) => (
                  <Picker.Item key={pref} label={pref} value={pref} />
                ))}
              </Picker>
            </View>
          </Collapsible>

          <TouchableOpacity
            onPress={() => setIsCityAccordionOpen(!isCityAccordionOpen)}
            style={styles.accordionHeader}
            disabled={!formData.prefecture}
          >
            <Text style={[styles.label, !formData.prefecture && styles.disabledText]}>
              {formData.city ? formData.city : "市区町村を選択してください ▼"} 
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={!isCityAccordionOpen}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.city}
                onValueChange={handleCityChange}
                enabled={!!formData.prefecture}
                mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="市区町村を選択" value="" />
                {availableCities.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
          </Collapsible>

          <Text style={styles.label}>日付と時間帯 *</Text>
          <TextInput
            style={styles.input}
            placeholder="例: 2025年6月20日 14:00〜16:00"
            placeholderTextColor="#999"
            value={formData.dateTime}
            onChangeText={(text) => handleInputChange("dateTime", text)}
          />

          <Text style={styles.label}>募集人数 *</Text>
          <TextInput
            style={styles.input}
            placeholder="例: 5"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={formData.participants}
            onChangeText={(text) => handleInputChange("participants", text.replace(/[^0-9]/g, ""))}
          />

          <Text style={styles.label}>募集内容 *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="募集の詳細を記入してください"
            placeholderTextColor="#999"
            multiline
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />

          <Text style={styles.label}>写真をアップロード (最大3枚)</Text>
          <View style={styles.imageContainer}>
            {images.map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleImageRemove(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 3 && (
              <TouchableOpacity style={styles.addButton} onPress={handleImagePick}>
                <Text style={styles.addButtonText}>写真を追加</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
=======
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
>>>>>>> 0849e68 (fix:投稿ページ)
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#F9F9F9",
  },
  formContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  disabledText: {
    color: '#999',
  },
  accordionHeader: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
=======
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
>>>>>>> 0849e68 (fix:投稿ページ)
  },
  pickerContainer: {
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    height: Platform.OS === 'ios' ? 50 : 50,
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 216 : 50,
    width: '100%',
    backgroundColor: '#FFF',
    color: '#333',
  },
  pickerItem: {
    color: '#333',
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
    backgroundColor: "#FFF",
    color: "#333",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF5A5F",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  addButtonText: {
    color: "#333",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    width: "30%",
    alignSelf: "flex-end",
    shadowColor: "#FF5A5F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});