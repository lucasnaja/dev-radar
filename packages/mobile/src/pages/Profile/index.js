import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Profile({ navigation }) {
    const login = navigation.getParam('login');

    return (
        <WebView
            style={styles.page}
            source={{ uri: `https://github.com/${login}` }}
        />
    );
}

const styles = StyleSheet.create({
    page: { flex: 1 },
});
