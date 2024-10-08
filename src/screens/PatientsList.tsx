import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Paciente } from '../models/Patient';
import { PatientDetailsModal } from '../components/PatientDetails';
import { Historial } from '../models/History';
import { getHistoryById } from '../api/historyEndpoint';
import {
    deletePatient,
    getAllPatients,
    getPatientsByName
} from '../api/patientEndpoint';
import { RootStackParamList } from '../rootTypes';

type PatientsListScreenProps = NativeStackScreenProps<RootStackParamList, 'PatientsListScreen'>;

export const PatientsListScreen: React.FC<PatientsListScreenProps> = ({ navigation }) => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [nombre, setNombre] = useState('');
    const [historial, setHistorial] = useState<Historial | null>(null);
    const [modalDetails, setModalDetails] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null);

    useEffect(() => {
        getPatients();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getPatients();
        }, [])
    );

    const getPatients = async () => {
        const response = await getAllPatients();
        setPacientes(response.data.pacientes);
    };

    const getHistory = async (id: number) => {
        const response = await getHistoryById(id);
        setHistorial(response.data.historial);
    };

    const confirmDelete = (id: number) => {
        Alert.alert(
            'Eliminar registro',
            '¿Está seguro de querer eliminar este registro?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => handleDelete(id),
                },
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async (id: number) => {
        const response = await deletePatient(id);
        Alert.alert(response.data.message, 'Registro eliminado');
        getPatients();
    };

    const handleViewDetails = (paciente: Paciente) => {
        setSelectedPatient(paciente);
        getHistory(paciente.id_paciente);
        setModalDetails(true);
    };

    const handleSearch = async (nombre: string) => {
        setNombre(nombre);
        if (nombre) {
            const response = await getPatientsByName(nombre);
            setPacientes(response.data.pacientes);
        } else {
            getPatients();
        }
    };

    const formatDateISO = (dateISO: string) => {
        const date = new Date(dateISO);

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const tableHead = ['Nombre', 'Información', 'Acciones'];
    const columnWidths = [200, 200, 150];

    const tableData = pacientes.map((paciente) => [
        <View style={styles.tableContainer}>
            <Text style={{ padding: 4 }}>{paciente.nombre} {paciente.apellidos}</Text>
            <Text style={{
                backgroundColor: paciente.sexo == 1 ? 'lightblue' : 'pink',
                color: '#fff', borderRadius: 30, padding: 4
            }}>
                {paciente.sexo == 1 && 'Hombre'}
                {paciente.sexo == 2 && 'Mujer'}
            </Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Email: {paciente.correo}</Text>
            <Text>Tel: {paciente.telefono}</Text>
            <Text>Nacimiento: {formatDateISO(paciente.fecha_nacimiento)}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: 5, padding: 5 }}
                onPress={() => handleViewDetails(paciente)}>
                <Icon3 name="user" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 5, padding: 5 }}
                onPress={() => navigation.navigate('EditPatientScreen', { paciente })}>
                <Icon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, padding: 5 }}
                onPress={() => confirmDelete(paciente.id_paciente)}>
                <Icon2 name="delete" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    ]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatientFormScreen')} >
                    <Text style={styles.buttonText}>{'Registrar paciente'.toUpperCase()}</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="Buscar por nombre" value={nombre} onChangeText={handleSearch} />
                <ScrollView horizontal style={{ marginTop: 20 }}>
                    <View>
                        {pacientes.length > 0 ? (
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
                                {selectedPatient && (
                                    <PatientDetailsModal
                                        visible={modalDetails}
                                        onClose={() => setModalDetails(false)}
                                        paciente={selectedPatient}
                                        historial={historial}
                                    />
                                )}
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
    row: {
        flexDirection: 'row',
        height: 100,
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