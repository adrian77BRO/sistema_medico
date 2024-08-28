import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Perfil } from '../models/User';
import { getProfile } from '../api/userEndpoint';
import { getCountPatient } from '../api/patientEndpoint';
import { getCountAppointment } from '../api/appointmentEndpoint';
import { getCountConsult } from '../api/consultEndpoint';

export const HomeScreen: React.FC = () => {
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
            <View style={styles.box}>
                <Text style={styles.text}>Citas</Text>
                <Text style={styles.subtext}>{numCitas}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Consultas</Text>
                <Text style={styles.subtext}>{numConsultas}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Pacientes</Text>
                <Text style={styles.subtext}>{numPacientes}</Text>
            </View>
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
        fontSize: 40,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 25,
        marginBottom: 20
    },
    box: {
        width: 300,
        height: 150,
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
    }
});