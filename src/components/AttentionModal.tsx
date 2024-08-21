import React, { useState } from 'react';
import { View, Text, Modal, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Attention } from '../models/Attention';

interface AttentionModalProps {
    visible: boolean;
    onClose: () => void;
}

export const AttentionModal: React.FC<AttentionModalProps> = ({ visible, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [symptoms, setSympstoms] = useState('');
    const [causes, setCauses] = useState('');
    const [status, setStatus] = useState(false);
    const [attentions, setAttentions] = useState<Attention[]>([]);

    const tableHead = ['Nombre', 'Descripción', 'Estatus', 'Acciones'];
    const columnWidths = [200, 250, 100, 100];

    const tableData = attentions.map((attention) => [
        <View style={styles.tableContainer}>
            <Text>{attention.name}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{attention.description}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ color: attention.status ? 'green' : 'red' }}>{attention.status ? 'ACTIVO' : 'INACTIVO'}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="E" color='blue' />
            <Button title="D" color="red" />
        </View>
    ]);

    const handleSave = () => {
        const newAttention: Attention = {
            id: Math.random().toString(),
            name,
            description,
            symptoms,
            causes,
            status
        };
        setAttentions((prev) => [...prev, newAttention]);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.modalTitle}>Atención médica</Text>
                    <Text style={styles.modalText}>Médico: Armando Perea Orozco</Text>

                    <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Descripción"
                        multiline={true} numberOfLines={4} value={description} onChangeText={setDescription} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Síntomas"
                        multiline={true} numberOfLines={4} value={symptoms} onChangeText={setSympstoms} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Causas"
                        multiline={true} numberOfLines={4} value={causes} onChangeText={setCauses} />
                    <View style={styles.pickerContainer}>
                        <Picker style={styles.picker} selectedValue={status} onValueChange={setStatus}>
                            <Picker.Item label="Activo" value="" />
                            <Picker.Item label="Sí" value={true} />
                            <Picker.Item label="No" value={false} />
                        </Picker>
                    </View>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleSave}>
                        <Text style={styles.buttonText}>{'Guardar'.toUpperCase()}</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Información general</Text>
                    <ScrollView horizontal>
                        <View style={styles.container}>
                            {attentions.length > 0 ? (
                                <>
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
                                </>
                            ) :
                                <Text>{'No se encontraron resultados'.toUpperCase()}</Text>
                            }
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onClose}>
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
        padding: 10,
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
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
        marginVertical: 20
    },
    button: {
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
    bigText: {
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        height: 80,
        textAlignVertical: 'top',
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