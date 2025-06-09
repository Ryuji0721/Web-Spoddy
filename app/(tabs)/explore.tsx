import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Collapsible from "react-native-collapsible";

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const cities: Record<string, string[]> = {
  北海道: ["札幌市", "函館市", "小樽市"],
  青森県: ["青森市", "弘前市", "八戸市"],
  東京都: ["千代田区", "中央区", "港区", "新宿区", "渋谷区", "豊島区", "板橋区", "練馬区"],
  大阪府: ["大阪市", "堺市", "岸和田市"],
  福岡県: ["福岡市", "北九州市", "久留米市", "大牟田市"]
};

export default function ExploreScreen() {
  const [formData, setFormData] = useState({
    prefecture: "",
    city: "",
    dateTime: "",
    participants: "",
    description: "",
  });

  const [isPrefectureCollapsed, setIsPrefectureCollapsed] = useState(true);
  const [isCityCollapsed, setIsCityCollapsed] = useState(true);

  const handlePrefectureChange = (value: string) => {
    setFormData((prev) => ({ ...prev, prefecture: value, city: "" }));
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    Alert.alert("募集内容を送信しました！", "データがコンソールに出力されました。");
  };

  const availableCities = formData.prefecture ? cities[formData.prefecture] || [] : [];

  return (
    <View style={styles.container}>
      {/* 投稿ボタン */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>投稿する</Text>
      </TouchableOpacity>

      {/* フォームコンテナ */}
      <View style={styles.formContainer}>
        {/* 都道府県アコーディオン */}
        <TouchableOpacity
          onPress={() => setIsPrefectureCollapsed(!isPrefectureCollapsed)}
          style={styles.accordionHeader}
        >
          <Text style={styles.label}>都道府県 *</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isPrefectureCollapsed}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.prefecture}
              onValueChange={handlePrefectureChange}
              mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="選択してください" value="" />
              {prefectures.map((pref) => (
                <Picker.Item key={pref} label={pref} value={pref} />
              ))}
            </Picker>
          </View>
        </Collapsible>

        {/* 市区町村アコーディオン */}
        <TouchableOpacity
          onPress={() => setIsCityCollapsed(!isCityCollapsed)}
          style={styles.accordionHeader}
        >
          <Text style={styles.label}>市区町村 *</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isCityCollapsed}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
  accordionHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    height: Platform.OS === 'ios' ? 50 : 50,
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 216 : 50,
    width: '100%',
    backgroundColor: 'transparent',
  },
  pickerItem: {
    color: '#333',
    fontSize: 18,
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
  },
  submitButton: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});