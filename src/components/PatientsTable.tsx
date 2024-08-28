/*import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Paciente } from '../models/Patient';
import { PatientDetailsModal } from '../components/PatientDetails';
import { PaymentsPatientModal } from './PaymentsPatient';
import { getAllPatients } from '../api/patientEndpoint';

export const PatientsTable: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [modalDetails, setModalDetails] = useState(false);
    const [modalPayments, setModalPayments] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        const response = await getAllPatients();
        setPacientes(response.data.pacientes);
    };

    const handleViewDetails = (paciente: Paciente) => {
        setSelectedPatient(paciente);
        setModalDetails(true);
    };

    const handleViewPayments = (paciente: Paciente) => {
        setSelectedPatient(paciente);
        setModalPayments(true);
    };

    const tableHead = ['Nombre', 'Información', 'Info. pagos', 'Por atender', 'Atendidos', 'Cancelados', 'Acciones'];
    const columnWidths = [200, 200, 200, 100, 100, 100, 200];

    const tableData = pacientes.map((paciente) => [
        <View style={styles.tableContainer}>
            <Text style={{ padding: 4 }}>{paciente.nombre} {paciente.apellidos}</Text>
            <Text style={{ backgroundColor: 'green', color: '#fff', borderRadius: 30, padding: 4 }}>{paciente.sexo}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Email: {paciente.correo}</Text>
            <Text>Tel: {paciente.telefono}</Text>
            <Text>Nacimiento: {paciente.fecha_nacimiento}</Text>
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
            <Button title="E" color='blue' />
            <Button title="D" color="red" />
        </View>
    ]);



    return (
        <View style={styles.container}>
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
                            patient={selectedPatient}
                        />
                    )}
                    {selectedPatient && (
                        <PaymentsPatientModal
                            visible={modalPayments}
                            onClose={() => setModalPayments(false)}
                            patient={selectedPatient}
                        />
                    )}
                </>
            ) :
                <Text>{'No se encontraron resultados'.toUpperCase()}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 20
    },
    headerRow: {
        height: 40,
        backgroundColor: '#34dbb8'
    },
    row: {
        flexDirection: 'row',
        height: 150,
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
});*/