import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
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
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/salud_confiable.png')}
                    style={styles.image}
                />
            </View>
            <Text style={styles.text}>Iniciar sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={pass}
                onChangeText={setPass}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin(usuario, pass)}>
                <Text style={styles.buttonText}>{'Iniciar sesión'.toUpperCase()}</Text>
            </TouchableOpacity>
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
        borderColor: '#34dbb8',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    imageContainer: {
        padding: 20
    },
    image: {
        width: 275,
        height: 100,
        marginBottom: 10,
    },
});