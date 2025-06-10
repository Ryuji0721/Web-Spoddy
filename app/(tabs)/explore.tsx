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
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Collapsible from "react-native-collapsible";
import * as ImagePicker from "expo-image-picker";

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
  東京都: ["千代田区", "中央区", "港区", "新宿区", "渋谷区", "豊島区", "板橋区", "練馬区", "その他"],
  大阪府: ["大阪市", "堺市", "岸和田市", "その他"],
  福岡県: ["福岡市", "北九州市", "久留米市", "大牟田市", "その他"]
};

interface CustomDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  selectedValue: string;
  disabled?: boolean;
}

export default function ExploreScreen() {
  const [formData, setFormData] = useState({
    prefecture: "",
    city: "",
    dateTime: "",
    participants: "",
    description: "",
  });

  const [isPrefectureModalVisible, setPrefectureModalVisible] = useState(false);
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handlePrefectureChange = (value: string) => {
    setFormData((prev) => ({ ...prev, prefecture: value, city: "" }));
    setPrefectureModalVisible(false);
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
    setCityModalVisible(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const CustomDropdown = ({ 
    isVisible, 
    onClose, 
    options, 
    onSelect, 
    placeholder, 
    selectedValue,
    disabled = false 
  }: CustomDropdownProps) => (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderText}>{placeholder}</Text>
              </View>
              <View style={styles.optionsContainer}>
                <ScrollView 
                  style={styles.optionsList}
                  showsVerticalScrollIndicator={true}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionItem,
                        selectedValue === option && styles.selectedOption
                      ]}
                      onPress={() => onSelect(option)}
                    >
                      <Text style={[
                        styles.optionText,
                        selectedValue === option && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.scrollIndicator}>
                  <Text style={styles.scrollIndicatorText}>▼ スクロールして続きを表示 ▼</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.scrollViewContent}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>投稿する</Text>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <TouchableOpacity
              onPress={() => setPrefectureModalVisible(true)}
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownButtonText}>
                {formData.prefecture || "都道府県を選択してください"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            <CustomDropdown
              isVisible={isPrefectureModalVisible}
              onClose={() => setPrefectureModalVisible(false)}
              options={prefectures}
              onSelect={handlePrefectureChange}
              placeholder="都道府県を選択"
              selectedValue={formData.prefecture}
            />

            <TouchableOpacity
              onPress={() => formData.prefecture && setCityModalVisible(true)}
              style={[
                styles.dropdownButton,
                !formData.prefecture && styles.disabledDropdown
              ]}
              disabled={!formData.prefecture}
            >
              <Text style={[
                styles.dropdownButtonText,
                !formData.prefecture && styles.disabledText
              ]}>
                {formData.city || "市区町村を選択してください"}
              </Text>
              <Text style={[
                styles.dropdownIcon,
                !formData.prefecture && styles.disabledText
              ]}>▼</Text>
            </TouchableOpacity>

            <CustomDropdown
              isVisible={isCityModalVisible}
              onClose={() => setCityModalVisible(false)}
              options={availableCities}
              onSelect={handleCityChange}
              placeholder="市区町村を選択"
              selectedValue={formData.city}
              disabled={!formData.prefecture}
            />

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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#666',
  },
  disabledDropdown: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    padding: 0,
    overflow: 'hidden',
  },
  dropdownHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    position: 'relative',
    maxHeight: 300,
  },
  optionsList: {
    maxHeight: 250,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#F8F8F8',
  },
  selectedOptionText: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  scrollIndicatorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
});