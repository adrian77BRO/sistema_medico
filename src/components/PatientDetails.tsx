import React, { useState } from 'react';
import { View, Text, Modal, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Picker } from '@react-native-picker/picker';

import { Patient } from '../models/Patient';
import { History } from '../models/History';

export const PatientDetailsModal: React.FC<{ patient: Patient; visible: boolean; onClose: () => void; }> = ({ patient, visible, onClose }) => {
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [blood, setBlood] = useState('');
    const [surgery, setSurgery] = useState('');
    const [transfusion, setTransfusion] = useState('');
    const [donation, setDonation] = useState('');

    const tableHead = ['Médico', 'Diagnóstico', 'Nota médica', 'Costo', 'Estatus', 'Acciones'];
    const columnWidths = [200, 200, 200, 100, 100, 100];

    const tableData = [
        [<View style={styles.tableContainer}>
            <Text>Armando Perea Orozco</Text>
            <Text>Consulta: 18/08/2024</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Malestar</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Dolor</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>$200.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Atendido</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="I" />
            <Button title="D" color="red" />
        </View>],
        [<View style={styles.tableContainer}>
            <Text>Armando Perea Orozco</Text>
            <Text>Consulta: 18/08/2024</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Malestar</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Dolor</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>$200.00</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Atendido</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="I" />
            <Button title="D" color="red" />
        </View>],
    ]

    const sections = [
        {
            title: 'Información general',
            content: (
                <View>
                    <Text>NOMBRE: {patient.name} {patient.lastName}</Text>
                    <Text>EMAIL: {patient.email}</Text>
                    <Text>FECHA DE NACIMIENTO: {patient.birth}</Text>
                    <Text>TELÉFONO: {patient.phone}</Text>
                    <Text>SEXO: {patient.gender}</Text>
                    <Text>POR ATENDER: 1</Text>
                    <Text>ATENDIDOS: 2</Text>
                    <Text>CANCELADOS: 0</Text>
                </View>
            ),
        },
        {
            title: 'Historial clínico',
            content: (
                <View>
                    <TextInput style={styles.bigText} placeholder="Antecedentes heredofamiliares"
                        multiline={true} numberOfLines={4} />
                    <View style={styles.row}>
                        <TextInput style={styles.input} placeholder="Alergias" />
                        <TextInput style={styles.input} placeholder="Patologías" />
                    </View>
                    <TextInput style={styles.bigText} placeholder="Observaciones"
                        multiline={true} numberOfLines={4} />
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={blood} onValueChange={(itemValue) => setBlood(itemValue)}>
                                <Picker.Item label="Tipo de sangre" value="" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={surgery} onValueChange={(itemValue) => setSurgery(itemValue)}>
                                <Picker.Item label="Intervención quirúrgica" value="" />
                                <Picker.Item label="Sí" value="Sí" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={transfusion} onValueChange={(itemValue) => setTransfusion(itemValue)}>
                                <Picker.Item label="Transfusión sanguínea" value="" />
                                <Picker.Item label="Sí" value="Sí" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={donation} onValueChange={(itemValue) => setDonation(itemValue)}>
                                <Picker.Item label="Donación sanguínea" value="" />
                                <Picker.Item label="Sí" value="Sí" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() =>
                        console.log('Cambios actualizados')
                    }>
                        <Text style={styles.buttonText}>{'Actualizar'.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            title: 'Historial de consultas y citas',
            content: (
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
            ),
        },
    ];

    const renderHeader = (section: any, _: any, isActive: boolean) => (
        <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
            <Text style={styles.headerText}>{section.title}</Text>
        </View>
    );

    const renderContent = (section: any) => (
        <View style={styles.content}>
            {section.content}
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView style={{ marginTop: 20 }}>
                    <Text style={styles.modalTitle}>Información del paciente: {patient.name} {patient.lastName}</Text>
                    <Accordion
                        sections={sections}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={setActiveSections}
                    />
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>{'Cerrar'.toUpperCase()}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        padding: 7,
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    header: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
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
    active: {
        backgroundColor: '#34dbb8',
    },
    inactive: {
        backgroundColor: '#acffee',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    bigText: {
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        height: 80,
        textAlignVertical: 'top',
    },
    headerRow: {
        height: 40,
        backgroundColor: '#34dbb8'
    },
    rows: {
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
    text: {
        margin: 6,
        textAlign: 'center',
    },
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});