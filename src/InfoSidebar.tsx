import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getProfile } from './api/userEndpoint';
import { Perfil } from './models/User';

export default function CustomDrawerContent(props: any) {
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    useEffect(() => {
        getProfileUser();
    }, []);

    const getProfileUser = async () => {
        const response = await getProfile();
        setPerfil(response.data.perfil);
    };

    const handleLogout = async () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Cerrar Sesión',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('authToken');
                        props.navigation.replace('Login');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/salud_confiable.png')}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.username}>{perfil?.nombre} {perfil?.apellidos}</Text>
                <Text style={styles.email}>{perfil?.correo}</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.footer}>
                <Text style={styles.footerText}>App Version 1.0.0</Text>
                <Icon name="cog" size={24} color="#000" />
            </View>
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogout} >
                    <Text style={styles.buttonText}>{'Cerrar sesión'.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    imageContainer: {
        padding: 20
    },
    image: {
        width: 275,
        height: 100,
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        marginTop: 20,
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 14,
        color: '#999',
    },
    logoutContainer: {
        marginTop: 'auto',
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
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
});
