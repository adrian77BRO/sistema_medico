import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../rootTypes';
import { loginUser } from '../api/userEndpoint';
import { setToken } from '../storage/token';
import { setIdUser } from '../storage/userStorage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

export const LoginScreen: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [pass, setPass] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async (usuario: string, pass: string) => {
        try {
            if (!usuario) {
                Alert.alert('Llenar todos los campos', 'Todos los campos son requeridos');
                return;
            }
            const response = await loginUser(usuario, pass);
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
                placeholder="Nombre de usuario"
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={setPass}
                secureTextEntry
            />
            <Button title="Login" onPress={() => handleLogin(usuario, pass)} />
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