import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

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
});
