import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Consult } from '../models/Consult';

interface ConsultsTableProps {
    consults: Consult[];
    onEdit: (consult: Consult) => void;
    onDelete: (id: string) => void;
}

export const ConsultsTable: React.FC<ConsultsTableProps> = ({ consults, onEdit, onDelete }) => {
    const [modalDetails, setModalDetails] = useState(false);
    const [selectedConsult, setSelectedConsult] = useState<Consult | null>(null);

    const tableHead = [
        'Paciente',
        'Médico',
        'Info. pagos',
        'Diagnóstico',
        'Nota médica',
        'Acciones'
    ];

    const tableData = consults.map((consult) => [
        <View style={styles.tableContainer}>
            <Text>Adrián Mauricio Hernández Pérez</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Armando Perea Orozco</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Monto total: $200.00</Text>
            <Text>Monto pagado: $600.00</Text>
            <Text>Servicios: Consulta general</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{consult.diagnosis}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{consult.suffering}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="E" onPress={() => onEdit(consult)} color='blue' />
            <Button title="D" onPress={() => onDelete(consult.id)} color="red" />
        </View>
    ]);

    const columnWidths = [200, 200, 200, 150, 150, 120];

    return (
        <View style={styles.container}>
            {consults.length > 0 ? (
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
});