import React, { useState } from 'react';
import { View, Text, Modal, Button, TextInput, Pressable, ScrollView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Patient } from '../models/Patient';
import { Payment } from '../models/Payment';

export const PaymentsPatientModal: React.FC<{ patient: Patient; visible: boolean; onClose: () => void; }> = ({ patient, visible, onClose }) => {
    const [datePayment, setDatePayment] = useState('');
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [showDate, setShowDate] = useState(false);

    const tableHead = ['Médico', 'Monto', 'Fecha de pago', 'Acciones'];
    const columnWidths = [200, 150, 150, 100];

    const tableData = [
        [<View style={styles.tableContainer}>
            <Text>Armando Pérez Orozco</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>$600.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>2024-08-12</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="I" />
            <Button title="D" color="red" />
        </View>],
        [<View style={styles.tableContainer}>
            <Text>Armando Pérez Orozco</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>$600.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>2024-08-12</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="I" />
            <Button title="D" color="red" />
        </View>],
        [<View style={styles.tableContainer}>
            <Text>Armando Pérez Orozco</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>$600.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>2024-08-12</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="I" />
            <Button title="D" color="red" />
        </View>],
        [<View style={styles.tableContainer}>
            <Text>Armando Pérez Orozco</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>$600.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>2024-08-12</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="I" />
            <Button title="D" color="red" />
        </View>]
    ]

    const handleSave = () => {
        const newPayment: Payment = {
            id: Math.random().toString(),
            doctor: 'Armando Pérez Orozco',
            date: datePayment,
            amount
        };
        console.log(newPayment)
    };

    const onChangeDate = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setDatePayment(currentDate.toDateString());
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.modalTitle}>Pagos de: {patient.name} {patient.lastName}</Text>
                    <Text style={styles.modalText}>Total: $1,300.00         Pagado: $600.00</Text>
                    <Text style={styles.modalText}>Adeudo total: $700.00</Text>
                    <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                        <View style={styles.container}>
                            <View style={[styles.rows, styles.headerRow]}>
                                {tableHead.map((header, index) => (
                                    <View key={index} style={[styles.cell, { width: columnWidths[index] }]}>
                                        <Text style={styles.textHeader}>{header}</Text>
                                    </View>
                                ))}
                            </View>
                            {tableData.map((rowData, rowIndex) => (
                                <View key={rowIndex} style={styles.rows}>
                                    {rowData.map((cellData, cellIndex) => (
                                        <View key={cellIndex} style={{ borderColor: '#34dbb8', borderRightWidth: 1, width: columnWidths[cellIndex] }}>
                                            {cellData}
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <View>
                        <Pressable onPress={showDatepicker}>
                            <TextInput style={styles.input} value={datePayment ? date.toLocaleDateString('es-MX') : 'Fecha de pago'} editable={false} />
                            {showDate && (
                                <DateTimePicker
                                    value={date || new Date()}
                                    mode="date"
                                    display="spinner"
                                    onChange={onChangeDate}
                                />
                            )}
                        </Pressable>
                        <TextInput style={styles.input} placeholder="Monto" value={amount} onChangeText={setAmount} keyboardType="numeric" />
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>{'Guardar'.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>{'Cancelar'.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>{'Cerrar'.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
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
    button: {
        backgroundColor: 'green',
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    headerRow: {
        height: 40,
        backgroundColor: '#34dbb8'
    },
    rows: {
        flexDirection: 'row',
        height: 50,
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
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});