import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const AboutScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acerca de</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50
    }
});