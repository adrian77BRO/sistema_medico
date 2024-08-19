import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Patient } from '../models/Patient';
import { PatientDetailsModal } from '../components/PatientDetails';
import { PaymentsPatientModal } from './PaymentsPatient';

interface PatientsTableProps {
    patients: Patient[];
    onEdit: (patient: Patient) => void;
    onDelete: (id: string) => void;
}

export const PatientsTable: React.FC<PatientsTableProps> = ({ patients, onEdit, onDelete }) => {
    const [modalDetails, setModalDetails] = useState(false);
    const [modalPayments, setModalPayments] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const handleViewDetails = (patient: Patient) => {
        setSelectedPatient(patient);
        setModalDetails(true);
    };

    const handleViewPayments = (patient: Patient) => {
        setSelectedPatient(patient);
        setModalPayments(true);
    };

    const tableHead = [
        'Nombre',
        'Información',
        'Info. pagos',
        'Por atender',
        'Atendidos',
        'Cancelados',
        'Acciones'
    ];

    const tableData = patients.map((patient) => [
        <View style={styles.tableContainer}>
            <Text style={{ padding: 4 }}>{patient.name} {patient.lastName}</Text>
            <Text style={{ backgroundColor: 'green', color: '#fff', borderRadius: 30, padding: 4 }}>{patient.gender}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Email: {patient.email}</Text>
            <Text>Tel: {patient.phone}</Text>
            <Text>Nacimiento: {patient.birth}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Monto total: $1,100.00</Text>
            <Text>Monto pagado: $600.00</Text>
            <Text>Monto restante: $500.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'orange' }}>1</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'green' }}>2</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'red' }}>3</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="P" onPress={() => handleViewPayments(patient)} color='orange' />
            <Button title="I" onPress={() => handleViewDetails(patient)} color='green' />
            <Button title="E" onPress={() => onEdit(patient)} color='blue' />
            <Button title="D" onPress={() => onDelete(patient.id)} color="red" />
        </View>
    ]);

    const columnWidths = [200, 200, 200, 100, 100, 100, 200];

    return (
        <View style={styles.container}>
            {patients.length > 0 ? (
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
});