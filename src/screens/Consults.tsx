import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../rootTypes';

import { Consult } from '../models/Consult';
import { ConsultsTable } from '../components/ConsultsTable';

type ConsultsScreenProps = NativeStackScreenProps<RootStackParamList, 'ConsultsScreen'>;

export const ConsultsScreen: React.FC<ConsultsScreenProps> = ({ navigation }) => {
    const [consults, setConsults] = useState<Consult[]>([]);

    const handleAddConsult = () => {
        navigation.navigate('ConsultFormScreen', {
            onSave: (newConsult: Consult) => {
                setConsults((prev) => [...prev, newConsult]);
            },
        });
    };

    const handleEditConsult = (consult: Consult) => {

    };

    const handleDeleteConsult = (id: string) => {
        setConsults((prev) => prev.filter((consult) => consult.id !== id));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleAddConsult}>
                    <Text style={styles.buttonText}>{'Nueva consulta'.toUpperCase()}</Text>
                </TouchableOpacity>
                <ScrollView horizontal style={{ marginTop: 20 }}>
                    <ConsultsTable
                        consults={consults}
                        onEdit={handleEditConsult}
                        onDelete={handleDeleteConsult}
                    />
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'green',
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