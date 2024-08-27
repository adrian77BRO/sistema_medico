import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Atencion, NuevaAtencion } from '../models/Attention';
import { EditAttentionModal } from './EditAttention';
import {
    getAllAttentions,
    createAttention,
    deleteAttention
} from '../api/attentionEndpoint';

interface AttentionModalProps {
    visible: boolean;
    onClose: () => void;
    doctor: string;
}

export const AttentionModal: React.FC<AttentionModalProps> = ({ visible, onClose, doctor }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [causas, setCausas] = useState('');
    const [estatus, setEstatus] = useState(0);
    const [atenciones, setAtenciones] = useState<Atencion[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAttention, setSelectedAttention] = useState<Atencion | null>(null);

    useEffect(() => {
        getAttentions();
    }, []);

    const getAttentions = async () => {
        const response = await getAllAttentions();
        setAtenciones(response.data.atenciones);
    };

    const closeModal = () => {
        setModalVisible(false);
        getAttentions();
    }

    const tableHead = ['Nombre', 'Descripción', 'Estatus', 'Acciones'];
    const columnWidths = [200, 250, 100, 100];

    const tableData = atenciones.map((atencion) => [
        <View style={styles.tableContainer}>
            <Text>{atencion.nombre}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{atencion.descripcion}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ color: atencion.estatus == 1 ? 'green' : 'red' }}>
                {atencion.estatus == 1 ? 'ACTIVO' : 'INACTIVO'}
            </Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="E" color='blue' onPress={() => handleEdit(atencion)} />
            <Button title="D" color="red" onPress={() => confirmDelete(atencion.id_atencion_medica)} />
        </View>
    ]);

    const handleSave = async () => {
        const nuevaAtencion: NuevaAtencion = {
            nombre, descripcion, sintomas,
            causas, estatus
        };
        const response = await createAttention(nuevaAtencion);
        Alert.alert(response.data.message, 'Nuevo registro');
        getAttentions();

        setNombre('');
        setDescripcion('');
        setSintomas('');
        setCausas('');
        setEstatus(0);
    };

    const handleEdit = (atencion: Atencion) => {
        setSelectedAttention(atencion);
        setModalVisible(true);
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
        const response = await deleteAttention(id);
        Alert.alert(response.data.message, 'Registro eliminado');
        getAttentions();
    };

    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.modalTitle}>Atención médica</Text>
                    <Text style={styles.modalText}>Médico: {doctor}</Text>

                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Descripción"
                        multiline={true} numberOfLines={4} value={descripcion} onChangeText={setDescripcion} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Síntomas"
                        multiline={true} numberOfLines={4} value={sintomas} onChangeText={setSintomas} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Causas"
                        multiline={true} numberOfLines={4} value={causas} onChangeText={setCausas} />
                    <View style={styles.pickerContainer}>
                        <Picker style={styles.picker} selectedValue={estatus} onValueChange={setEstatus}>
                            <Picker.Item label="Activo" value="" />
                            <Picker.Item label="Sí" value={1} />
                            <Picker.Item label="No" value={0} />
                        </Picker>
                    </View>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleSave}>
                        <Text style={styles.buttonText}>{'Guardar'.toUpperCase()}</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        {selectedAttention && (
                            <EditAttentionModal
                                atencion={selectedAttention}
                                onClose={closeModal}
                            />
                        )}
                    </Modal>

                    <Text style={styles.modalTitle}>Información general</Text>
                    <ScrollView horizontal>
                        <View style={styles.container}>
                            {atenciones.length > 0 ? (
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
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});