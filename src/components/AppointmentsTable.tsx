/*import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Appointment } from '../models/Appointment';

interface AppointmentsTableProps {
    appointments: Appointment[];
    onEdit: (appointment: Appointment) => void;
    onDelete: (id: string) => void;
}

export const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ appointments, onEdit, onDelete }) => {
    const [modalDetails, setModalDetails] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const tableHead = [
        'Confirmado',
        'Paciente',
        'Fecha y hora',
        'Médico',
        'Estatus',
        'Acciones'
    ];

    const tableData = appointments.map((appointment) => [
        <View style={styles.tableContainer}>

        </View>,
        <View style={styles.tableContainer}>
            <Text>Adrián Mauricio Hernández Pérez</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{appointment.date} {appointment.time}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Armando Perea Orozco</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{appointment.status}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="E" onPress={() => onEdit(appointment)} color='blue' />
            <Button title="D" onPress={() => onDelete(appointment.id)} color="red" />
        </View>
    ]);

    const columnWidths = [100, 200, 150, 200, 100, 100, 200];

    return (
        <View style={styles.container}>
            {appointments.length > 0 ? (
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
});*/