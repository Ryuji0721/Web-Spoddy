import React, { useState } from 'react'; // useStateをインポート
import { ScrollView, View, Text, StyleSheet, Image, Button, Linking, TextInput } from 'react-native';

const MyPage = () => {
    // 名前と自己紹介の状態を管理
    const [name, setName] = useState('ダニエル');
    const [bio, setBio] = useState('東京都/新宿区');
    const [selfIntroductionMessage, setSelfIntroductionMessage] = useState(
        'バスケットボールが大好きで、毎週末に友達とプレイしています。新しい友達を作りたいです！'
    );

    // 編集状態を管理
    const [isEditing, setIsEditing] = useState(false);

    return (
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
                        <Text style={styles.bio}>{bio}</Text>
                        <Text style={styles.selfIntroduction}>自己紹介</Text>
                        <Text style={styles.selfIntroductionMessage}>{selfIntroductionMessage}</Text>
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
                    title={isEditing ? '完了' : '名前を編集'}
                    color="white"
                    onPress={() => setIsEditing((prev) => !prev)}
                />
            </View>
        </ScrollView>
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
    
});

export default MyPage;