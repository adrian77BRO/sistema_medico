import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../rootTypes';
import { loginUser } from '../api/userEndpoint';
import { setToken } from '../api/token';
import { setIdUser } from '../api/userStorage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

export const LoginScreen: React.FC = () => {
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async (correo: string, pass: string) => {
        try {
            const response = await loginUser(correo, pass);
            Alert.alert(response.data.message, 'Usuario autenticado correctamente');
            await setToken(response.data.token);
            await setIdUser(response.data.usuario.id_usuario);
            navigation.replace('Menu');
        } catch (error: any) {
            const errorMessage = error?.message || 'Error desconocido al iniciar sesión';
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={setPass}
                secureTextEntry
            />
            <Button title="Login" onPress={() => handleLogin(correo, pass)} />
            {/*<Text style={styles.link} onPress={() => navigation.navigate('Menu')}>
                Don't have an account? Sign up
            </Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    link: {
        marginTop: 16,
        color: 'blue',
        textAlign: 'center',
    },
});