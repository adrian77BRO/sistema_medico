import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Paciente } from '../models/Patient';
import { PatientDetailsModal } from '../components/PatientDetails';
import { PaymentsPatientModal } from '../components/PaymentsPatient';
import { deletePatient, getAllPatients } from '../api/patientEndpoint';
import { RootStackParamList } from '../rootTypes';

type PatientsListScreenProps = NativeStackScreenProps<RootStackParamList, 'PatientsListScreen'>;

export const PatientsListScreen: React.FC<PatientsListScreenProps> = ({ navigation }) => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [modalDetails, setModalDetails] = useState(false);
    const [modalPayments, setModalPayments] = useState(false);
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
        setModalDetails(true);
    };

    const handleViewPayments = (paciente: Paciente) => {
        setSelectedPatient(paciente);
        setModalPayments(true);
    };

    const formatDateISO = (dateISO: string) => {
        const date = new Date(dateISO);

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const tableHead = ['Nombre', 'Información', 'Info. pagos', 'Por atender', 'Atendidos', 'Cancelados', 'Acciones'];
    const columnWidths = [200, 200, 200, 100, 100, 100, 200];

    const tableData = pacientes.map((paciente) => [
        <View style={styles.tableContainer}>
            <Text style={{ padding: 4 }}>{paciente.nombre} {paciente.apellidos}</Text>
            <Text style={{ backgroundColor: 'green', color: '#fff', borderRadius: 30, padding: 4 }}>
                {paciente.sexo == 1 && 'Hombre'}
                {paciente.sexo == 2 && 'Mujer'}
            </Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Email: {paciente.correo}</Text>
            <Text>Tel: {paciente.telefono}</Text>
            <Text>Nacimiento: {formatDateISO(paciente.fecha_nacimiento)}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Monto total: $0</Text>
            <Text>Monto pagado: $0</Text>
            <Text>Monto restante: $0</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'orange' }}>0</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'green' }}>0</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'red' }}>0</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="P" onPress={() => handleViewPayments(paciente)} color='orange' />
            <Button title="I" onPress={() => handleViewDetails(paciente)} color='green' />
            <Button title="E" color='blue' onPress={() => navigation.navigate('EditPatientScreen', { paciente })} />
            <Button title="D" color="red" onPress={() => confirmDelete(paciente.id_paciente)} />
        </View>
    ]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatientFormScreen')} >
                    <Text style={styles.buttonText}>{'Registrar paciente'.toUpperCase()}</Text>
                </TouchableOpacity>
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
                                            <View key={cellIndex} style={{ borderColor: '#34dbb8', borderRightWidth: 1, width: columnWidths[cellIndex] }}>
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