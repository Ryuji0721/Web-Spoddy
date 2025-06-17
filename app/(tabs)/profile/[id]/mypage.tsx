import React, { useState } from 'react'; // useStateをインポート
import { ScrollView, View, Text, StyleSheet, Image, Button, Linking, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MyPage = () => {
    // 名前と自己紹介の状態を管理
    const [name, setName] = useState('ダニエル');
    const [bio, setBio] = useState('東京都/新宿区');
    const [selfIntroductionMessage, setSelfIntroductionMessage] = useState(
        'バスケットボールが大好きで、毎週末に友達とプレイしています。新しい友達を作りたいです！'
    );

    // 編集状態を管理
    const [isEditing, setIsEditing] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPrefecture, setSelectedPrefecture] = useState('東京都');
    const [selectedCity, setSelectedCity] = useState('新宿区');

    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('@/assets/images/kumagai.jpg')} style={styles.Image} />
            <View style={styles.status}>
                {isEditing ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="名前を入力"
                        />
                        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                          <Text style={styles.bio}>{selectedPrefecture}/{selectedCity}</Text>
                        </TouchableOpacity>
                        <Text style={styles.selfIntroduction}>自己紹介</Text>
                        <TextInput
                            style={[styles.selfIntroductionMessage, { textAlignVertical: 'top' }, styles.input]}
                            multiline
                            numberOfLines={4}
                            value={selfIntroductionMessage}
                            onChangeText={setSelfIntroductionMessage}
                            placeholder="自己紹介を入力"
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.bio}>{bio}</Text>
                        <Text style={styles.selfIntroduction}>自己紹介</Text>
                        <Text style={styles.selfIntroductionMessage}>{selfIntroductionMessage}</Text>
                    </>
                )}
            </View>

            <View style={styles.edit}>
                <Button
                    title={isEditing ? '完了' : '編集'}
                    color="white"
                    onPress={() => setIsEditing((prev) => !prev)}
                />
            </View>
        </ScrollView>
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>都道府県と市区町村を選択</Text>
              <Picker
              style={styles['input']}
                selectedValue={selectedPrefecture}
                onValueChange={(itemValue) => {
                  setSelectedPrefecture(itemValue);
                  setSelectedCity('');
                }}
              >
                <Picker.Item label="東京都" value="東京都" />
                <Picker.Item label="大阪府" value="大阪府" />
                <Picker.Item label="沖縄県" value="沖縄県" />
              </Picker>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
              >
                <Picker.Item label="市区町村を選択" value="" enabled={false} />
                {selectedPrefecture === '東京都' && (
                  <>
                    <Picker.Item label="新宿区" value="新宿区" />
                    <Picker.Item label="渋谷区" value="渋谷区" />
                  </>
                )}
                {selectedPrefecture === '大阪府' && (
                  <>
                    <Picker.Item label="大阪市" value="大阪市" />
                    <Picker.Item label="堺市" value="堺市" />
                  </>
                )}
                {selectedPrefecture === '沖縄県' && (
                    <>
                        <Picker.Item label="那覇市" value="那覇市" />
                        <Picker.Item label="宜野湾市" value="宜野湾市" />
                    </>
                    )}
              </Picker>
              <Button
                title="完了"
                onPress={() => {
                  setBio(`${selectedPrefecture}/${selectedCity}`);
                  setIsModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    Image: {
        width: '96%',
        height: 372,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    status: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
        borderRadius: 14,
        width: '90%',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    bio: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        lineHeight: 30,
    },
    selfIntroduction: {
        fontSize: 22, /* 36.082% */
        fontWeight: 'bold',
    },
    selfIntroductionMessage: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        borderColor: '#D0D0D0',
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    edit: {
        marginTop: 0,
        backgroundColor: '#DE5656',
        color: '#fff',
        padding: 5,
        borderRadius: 16,
        width: '50%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        width: '100%',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 12,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
});

export default MyPage;