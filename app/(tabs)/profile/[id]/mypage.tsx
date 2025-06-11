import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Button, Linking } from 'react-native';

const MyPage = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('@/assets/images/kumagai.jpg')} style={styles.Image} />
            <View style={styles.status}>
                <Text style={styles.name}>ダニエル</Text>
                <Text style={styles.bio}>東京都/新宿区</Text>
                {/* ?ここにプロフィールの詳細や趣味などを追加できます */}
                {/*<Text style={styles.good}>いいね</Text>*/}
                <Text style={styles.selfIntroduction}>自己紹介</Text>
                <Text style={styles.selfIntroductionMessage}>
                    バスケットボールが大好きで、毎週末に友達とプレイしています。新しい友達を作りたいです！
                </Text>
            </View>

            <View style={styles.edit}>
            <Button
                title="設定を開く"
                color="white"
                onPress={() => {
                    Linking.openSettings().catch(() => {
                        alert('設定画面を開けませんでした');
                    });
                }}
            />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Image:{
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
    good: {
        fontSize: 18,
        color: '#DE5656',
        marginBottom: 20,
    },
    selfIntroduction: {
        fontSize: 22,/* 36.082% */
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
    edit:{
        marginTop: 0,
        backgroundColor: '#DE5656',
        color: '#fff',
        padding: 5,
        borderRadius: 16,
        width: '50%',
    }
});

export default MyPage;