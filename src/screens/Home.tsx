import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Perfil } from '../models/User';
import { getProfile } from '../api/userEndpoint';
import { getCountPatient } from '../api/patientEndpoint';
import { getCountAppointment } from '../api/appointmentEndpoint';
import { getCountConsult } from '../api/consultEndpoint';
import { RootStackParamList } from '../rootTypes';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [numPacientes, setNumPacientes] = useState(0);
    const [numCitas, setNumCitas] = useState(0);
    const [numConsultas, setNumConsultas] = useState(0);

    useEffect(() => {
        getProfileUser();
        getPatients();
        getAppointments();
        getConsults();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getPatients();
            getAppointments();
            getConsults();
        }, [])
    );

    const getProfileUser = async () => {
        const response = await getProfile();
        setPerfil(response.data.perfil);
    };

    const getPatients = async () => {
        const response = await getCountPatient();
        setNumPacientes(response.data.count);
    };

    const getAppointments = async () => {
        const response = await getCountAppointment();
        setNumCitas(response.data.count);
    };

    const getConsults = async () => {
        const response = await getCountConsult();
        setNumConsultas(response.data.count);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>{perfil?.nombre} {perfil?.apellidos}</Text>
            <Text style={styles.special}>{perfil?.especialidad}</Text>
            <Text style={styles.doctor}>MÉDICO</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PatientsListScreen')}>
                <View style={styles.box}>
                    <Text style={styles.text}>Pacientes</Text>
                    <Text style={styles.subtext}>{numPacientes}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AppointmentsListScreen')}>
                <View style={styles.box}>
                    <Text style={styles.text}>Citas</Text>
                    <Text style={styles.subtext}>{numCitas}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ConsultsListScreen')}>
                <View style={styles.box}>
                    <Text style={styles.text}>Consultas</Text>
                    <Text style={styles.subtext}>{numConsultas}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CalendarScreen')}>
                <Text style={styles.buttonText}>{'Ver calendario'.toUpperCase()}</Text>
            </TouchableOpacity>
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
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 10
    },
    special: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    doctor: {
        color: 'blue',
        fontWeight: 'bold',
        marginBottom: 10
    },
    box: {
        width: 300,
        height: 100,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,

    },
    text: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subtext: {
        color: '#fff',
        fontSize: 30,
        marginTop: 10
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
});