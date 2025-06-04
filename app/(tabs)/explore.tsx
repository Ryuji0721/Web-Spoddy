import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector";

const placeholderImage = require("../../assets/placeholder.png");

// 都道府県データ（一部抜粋・必要に応じて追加してください）
const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

// 市区町村データ（一部サンプル）
const cities: Record<string, string[]> = {
  北海道: ["札幌市", "函館市", "小樽市"],
  青森県: ["青森市", "弘前市", "八戸市"],
  東京都: [
    "千代田区",
    "中央区",
    "港区",
    "新宿区",
    "渋谷区",
    "豊島区",
    "板橋区",
    "練馬区",
  ],
  大阪府: ["大阪市", "堺市", "岸和田市"],
  福岡県: ["福岡市", "北九州市", "久留米市"],
  // 必要に応じて追加してください
};

export default function ExploreScreen() {
  const [formData, setFormData] = useState({
    prefecture: "",
    city: "",
    participants: "",
    description: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<string[]>(["", "", ""]);

  // 都道府県変更時に市区町村リセット
  const handlePrefectureChange = (value: string) => {
    setFormData((prev) => ({ ...prev, prefecture: value, city: "" }));
  };

  // 市区町村変更
  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
  };

  // 入力変更
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async (index: number) => {
    Alert.alert(
      "画像アップロード",
      "この機能は現在ダミーです。実装してください。",
      [{ text: "OK" }]
    );
  };

  const handleSubmit = () => {
    if (
      !formData.prefecture ||
      !formData.city ||
      !formData.participants ||
      !formData.description
    ) {
      Alert.alert("エラー", "全ての必須項目を入力してください。");
      return;
    }
    console.log("フォームデータ:", {
      ...formData,
      selectedDate: selectedDate?.toLocaleString(),
    });
    Alert.alert("募集内容を送信しました！", "データがコンソールに出力されました。");
  };

  const availableCities = formData.prefecture
    ? cities[formData.prefecture] || []
    : [];

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
        {/* 都道府県Picker */}
        <View style={styles.pickerWrapper}>
          <Text>都道府県を選択 *</Text>
          <Picker
            selectedValue={formData.prefecture}
            onValueChange={handlePrefectureChange}
            mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
          >
            <Picker.Item label="選択してください" value="" />
            {prefectures.map((pref) => (
              <Picker.Item key={pref} label={pref} value={pref} />
            ))}
          </Picker>
        </View>

        {/* 市区町村Picker */}
        <View style={styles.pickerWrapper}>
          <Text>市区町村を選択 *</Text>
          <Picker
            selectedValue={formData.city}
            onValueChange={handleCityChange}
            enabled={!!formData.prefecture}
            mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
          >
            <Picker.Item
              label={
                formData.prefecture
                  ? "選択してください"
                  : "先に都道府県を選択してください"
              }
              value=""
            />
            {availableCities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        {/* 日付選択（仮・クリックでDatePicker表示想定） */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text style={formData.participants ? styles.inputText : styles.placeholderText}>
            {selectedDate ? selectedDate.toLocaleString() : "日付と時間帯を選択"}
          </Text>
        </TouchableOpacity>

        {/* 募集人数入力 */}
        <TextInput
          style={styles.input}
          placeholder="募集人数"
          keyboardType="numeric"
          value={formData.participants}
          onChangeText={(text) =>
            handleInputChange("participants", text.replace(/[^0-9]/g, ""))
          }
          placeholderTextColor="#999"
        />

        {/* 募集内容詳細入力 */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="募集内容を詳しく入力してください。"
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />

        {/* 画像アップロード */}
        <View style={styles.imageUploadRow}>
          {uploadedImages.map((uri, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageUploadBox}
              onPress={() => pickImage(index)}
            >
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
    backgroundColor: "#F7F7F7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 30,
  },
  closeButton: {
    fontSize: 28,
    color: "#333",
    fontWeight: "300",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postDate: {
    fontSize: 12,
    color: "#666",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#CCC",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#DE5656",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 10,
    justifyContent: "flex-start",
  },
  tag: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 13,
    color: "#333",
    overflow: "hidden",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  pickerWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  inputText: {
    color: "#000",
    fontSize: 16,
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: "top",
    paddingTop: 14,
  },
  imageUploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  imageUploadBox: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    overflow: "hidden",
  },
  cameraIcon: {
    fontSize: 24,
    color: "#666",
  },
  plusIcon: {
    fontSize: 28,
    color: "#666",
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 15,
    padding: 2,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  testModalSelectorContainer: {
    marginTop: 20,
  },
  testModalSelector: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: 200,
    height: 50,
  },
});