import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { Cita } from '../models/Appointment';
import {
    deleteAppointment,
    cancelAppointment,
    getAllAppointments,
    getAppointmentsByStatus,
    getAppointmentsByPatient
} from '../api/appointmentEndpoint';
import { RootStackParamList } from '../rootTypes';

type AppointmentsListScreenProps = NativeStackScreenProps<RootStackParamList, 'AppointmentsListScreen'>;

export const AppointmentsListScreen: React.FC<AppointmentsListScreenProps> = ({ navigation }) => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [paciente, setPaciente] = useState('');
    const [fecha, setFecha] = useState('');
    const [estatus, setEstatus] = useState(0);

    useEffect(() => {
        getAppointments();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAppointments();
        }, [])
    );

    const getAppointments = async () => {
        const response = await getAllAppointments();
        setCitas(response.data.citas);
    };

    const confirmDelete = (id: number) => {
        Alert.alert(
            'Eliminar registro',
            '¿Está seguro de querer eliminar este registro?',
            [
                { text: 'Cancelar', style: 'cancel', },
                { text: 'Eliminar', style: 'destructive', onPress: () => handleDelete(id) }
            ],
            { cancelable: true }
        );
    };

    const handleCancel = async (id: number) => {
        const response = await cancelAppointment(id);
        Alert.alert(response.data.message, 'Cita cancelada');
        getAppointments();
    };

    const confirmCancel = (id: number) => {
        Alert.alert(
            'Cancelar cita',
            '¿Está seguro de querer cancelar esta cita?',
            [
                { text: 'No', style: 'cancel', },
                { text: 'Sí', style: 'destructive', onPress: () => handleCancel(id) }
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async (id: number) => {
        const response = await deleteAppointment(id);
        Alert.alert(response.data.message, 'Registro eliminado');
        getAppointments();
    };

    const handleSearch = async (nombre: string) => {
        setPaciente(nombre);
        if (nombre) {
            const response = await getAppointmentsByPatient(nombre);
            setCitas(response.data.citas);
        } else {
            getAppointments();
        }
        setEstatus(1);
    };

    const handleStatus = async (estatus: number) => {
        setEstatus(estatus);
        if (estatus == 1) {
            getAppointments();
        } else {
            const response = await getAppointmentsByStatus(estatus);
            setCitas(response.data.citas);
        }
        setPaciente('');
    };

    const formatDateISO = (dateISO: string) => {
        const date = new Date(dateISO);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const tableHead = ['Paciente', 'Fecha y hora', 'Médico', 'Estatus', 'Acciones'];
    const columnWidths = [200, 150, 200, 100, 100, 200];

    const tableData = citas.map((cita) => [
        <View style={styles.tableContainer}>
            <Text>{cita.paciente}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{formatDateISO(cita.fecha)}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{cita.medico}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ color: cita.estatus == 0 ? 'orange' : 'red' }}>
                {cita.estatus == 0 && 'Por atender'}
                {cita.estatus == 2 && 'Cancelado'}
            </Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 5, padding: 5 }}
                onPress={() => navigation.navigate('EditAppointmentScreen', { cita })}>
                <Icon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            {cita.estatus == 0 && <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, padding: 5 }}
                onPress={() => confirmCancel(cita.id_cita)}>
                <Icon3 name="cancel" size={25} color="#fff" />
            </TouchableOpacity>}
            {cita.estatus == 2 && <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, padding: 5 }}
                onPress={() => confirmDelete(cita.id_cita)}>
                <Icon2 name="delete" size={25} color="#fff" />
            </TouchableOpacity>}
        </View>
    ]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppointmentFormScreen')} >
                    <Text style={styles.buttonText}>{'Nueva cita'.toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={styles.inputRow}>
                    <TextInput style={styles.input} placeholder="Buscar por nombre" value={paciente} onChangeText={handleSearch} />
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={estatus} style={styles.picker} onValueChange={handleStatus}>
                            <Picker.Item label="Por atender" value={0} />
                            <Picker.Item label="Todos" value={1} />
                            <Picker.Item label="Cancelado" value={2} />
                        </Picker>
                    </View>
                </View>
                <TextInput style={styles.input} placeholder="Buscar por fecha" value={fecha} onChangeText={setFecha} />
                <ScrollView horizontal style={{ marginTop: 20 }}>
                    <View>
                        {citas.length > 0 ? (
                            <>
                                <View style={[styles.row, styles.headerRow]}>
                                    {tableHead.map((header, index) => (
                                        <View key={index} style={[styles.cell, { width: columnWidths[index] }]}>
                                            <Text style={styles.text}>{header}</Text>
                                        </View>
                                    ))}
                                </View>
                                {tableData.map((rowData, rowIndex) => (
                                    <View key={rowIndex} style={styles.row}>
                                        {rowData.map((cellData, cellIndex) => (
                                            <View key={cellIndex} style={{
                                                borderColor: '#34dbb8',
                                                borderRightWidth: 1,
                                                width: columnWidths[cellIndex]
                                            }}>
                                                {cellData}
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </>
                        ) :
                            <Text>{'No se encontraron resultados'.toUpperCase()}</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20
    },
    headerRow: {
        height: 40,
        backgroundColor: '#34dbb8'
    },
    input: {
        flex: 2,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pickerContainer: {
        flex: 2,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    row: {
        flexDirection: 'row',
        height: 75,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#34dbb8',
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: '#34dbb8',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});