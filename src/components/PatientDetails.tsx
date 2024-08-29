import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Picker } from '@react-native-picker/picker';

import { Paciente } from '../models/Patient';
import { Historial, HistorialResponse, NuevoHistorial } from '../models/History';
import { Sangre } from '../models/Blood';
import {
    getHistoryById,
    getAllBloods,
    createHistory,
    updateHistory
} from '../api/historyEndpoint';

interface PatientDetailsProps {
    paciente: Paciente;
    visible: boolean;
    onClose: () => void;
}

export const PatientDetailsModal: React.FC<PatientDetailsProps> = ({ paciente, visible, onClose }) => {
    const [tipo_sangre, setTipo_sangre] = useState('');
    const [antecedentes_heredofamiliares, setAntecedentes_heredofamiliares] = useState('');
    const [alergias, setAlergias] = useState('');
    const [patologias, setPatologias] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [intervencion_quirurgica, setIntervencion_quirurgica] = useState('');
    const [transfucion_sanguinea, setTransfucion_sanguinea] = useState('');
    const [donacion_sanguinea, setDonacion_sanguinea] = useState('');
    const [historial, setHistorial] = useState<HistorialResponse | null>(null);
    const [tipos_sangre, setTipos_sangre] = useState<Sangre[]>([]);

    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [message, setMessage] = useState('');

    const tableHead = ['Médico', 'Diagnóstico', 'Nota médica', 'Costo', 'Estatus', 'Acciones'];
    const columnWidths = [200, 200, 200, 100, 100, 100];

    const formatDateISO = (dateISO: string) => {
        const date = new Date(dateISO);

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getBloods();
    }, []);

    /*const getHistory = async () => {
        const response = await getHistoryById(paciente.id_paciente);
        if (response.data.historial) {
            setHistorial(response.data.historial);
            console.log(response.data.historial);
        } else {
            setMessage(response.data.message);
            console.log(response.data.message);
        }
    };*/

    const getBloods = async () => {
        const response = await getAllBloods();
        setTipos_sangre(response.data.tipos_sangre);
    };

    const tableData = [
        [<View style={styles.tableContainer}>
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
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>NOMBRE: {paciente.nombre} {paciente.apellidos}</Text>
                    <Text style={styles.text}>EMAIL: {paciente.correo}</Text>
                    <Text style={styles.text}>FECHA DE NACIMIENTO: {formatDateISO(paciente.fecha_nacimiento)}</Text>
                    <Text style={styles.text}>TELÉFONO: {paciente.telefono}</Text>
                    <Text style={styles.text}>SEXO:
                        {paciente.sexo == 1 && ' Hombre'}
                        {paciente.sexo == 2 && ' Mujer'}
                    </Text>
                    <Text style={styles.text}>POR ATENDER: 1</Text>
                    <Text style={styles.text}>ATENDIDOS: 2</Text>
                    <Text style={styles.text}>CANCELADOS: 0</Text>
                </View>
            ),
        },
        {
            title: 'Historial clínico',
            content: (
                <View>
                    <TextInput style={styles.bigText} placeholder="Antecedentes heredofamiliares"
                        value={antecedentes_heredofamiliares}
                        onChangeText={setAntecedentes_heredofamiliares} multiline={true} numberOfLines={4} />
                    <View style={styles.row}>
                        <TextInput style={styles.input} placeholder="Alergias"
                            value={alergias}
                            onChangeText={setAlergias} />
                        <TextInput style={styles.input} placeholder="Patologías"
                            value={patologias}
                            onChangeText={setPatologias} />
                    </View>
                    <TextInput style={styles.bigText} placeholder="Observaciones"
                        value={observaciones}
                        onChangeText={setObservaciones} multiline={true} numberOfLines={4} />
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={tipo_sangre} onValueChange={setTipo_sangre}>
                                <Picker.Item label="Tipo de sangre" value="" />
                                {tipos_sangre.map((sangre, index) => (
                                    <Picker.Item key={index} label={sangre.nombre} value={sangre.id_tipo_sangre} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={intervencion_quirurgica}
                                onValueChange={setIntervencion_quirurgica}>
                                <Picker.Item label="Intervención quirúrgica" value="" />
                                <Picker.Item label="Sí" value={0} />
                                <Picker.Item label="No" value={1} />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={transfucion_sanguinea}
                                onValueChange={setTransfucion_sanguinea}>
                                <Picker.Item label="Transfusión sanguínea" value="" />
                                <Picker.Item label="Sí" value={0} />
                                <Picker.Item label="No" value={1} />
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={donacion_sanguinea}
                                onValueChange={setDonacion_sanguinea}>
                                <Picker.Item label="Donación sanguínea" value="" />
                                <Picker.Item label="Sí" value={0} />
                                <Picker.Item label="No" value={1} />
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button}>
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
                    <Text style={styles.modalTitle}>Información del paciente: {paciente.nombre} {paciente.apellidos}</Text>
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
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
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
    infoContainer: {
        backgroundColor: '#acffee',
        padding: 10,
        borderRadius: 20
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
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});