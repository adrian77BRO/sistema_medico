import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Appointment } from '../models/Appointment';
import { AppointmentsTable } from '../components/AppointmentsTable';
import { RootStackParamList } from '../rootTypes';

type AppointmentsScreenProps = NativeStackScreenProps<RootStackParamList, 'AppointmentsScreen'>;

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({ navigation }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const handleAddAppointment = () => {
        navigation.navigate('AppointmentFormScreen', {
            onSave: (newAppointment: Appointment) => {
                setAppointments((prev) => [...prev, newAppointment]);
            },
        });
    };

    const handleEditPatient = (appointment: Appointment) => {

    };

    const handleDeleteAppointment = (id: string) => {
        setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Atención médica a citas</Text>
                <TouchableOpacity style={styles.button} onPress={handleAddAppointment}>
                    <Text style={styles.buttonText}>{'Registrar cita'.toUpperCase()}</Text>
                </TouchableOpacity>
                <ScrollView horizontal style={{ marginTop: 20 }}>
                    <AppointmentsTable
                        appointments={appointments}
                        onEdit={handleEditPatient}
                        onDelete={handleDeleteAppointment}
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