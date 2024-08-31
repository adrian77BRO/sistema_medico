import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {
    View, Text, Modal, Alert, TextInput,
    ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Servicio, NuevoServicio } from '../models/Service';
import { EditServiceModal } from './EditService';
import {
    getAllServices,
    createService,
    deleteService
} from '../api/serviceEndpoint';

interface ServiceModalProps {
    visible: boolean;
    onClose: () => void;
    doctor: string;
}

export const ServicesModal: React.FC<ServiceModalProps> = ({ visible, onClose, doctor }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [orden, setOrden] = useState('');
    const [estatus, setEstatus] = useState(0);
    const [estatus_web, setEstatus_web] = useState(0);
    const [estatus_sistema, setEstatus_sistema] = useState(0);
    const [costo, setCosto] = useState('');
    const [servicios, setServicios] = useState<Servicio[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<Servicio | null>(null);

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        const response = await getAllServices();
        setServicios(response.data.servicios);
    };

    const closeModal = () => {
        setModalVisible(false);
        getServices();
    }

    const tableHead = ['Servicio', 'Orden', 'Estatus', 'Web', 'Sistema', 'Acciones'];
    const columnWidths = [200, 60, 100, 100, 100, 100];

    const tableData = servicios.map((servicio) => [
        <View style={styles.tableContainer}>
            <Text>{servicio.nombre}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{servicio.orden}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ color: servicio.estatus == 1 ? 'green' : 'red' }}>
                {servicio.estatus == 1 ? 'ACTIVO' : 'INACTIVO'}
            </Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ color: servicio.estatus_web == 1 ? 'green' : 'red' }}>
                {servicio.estatus_web == 1 ? 'ACTIVO' : 'INACTIVO'}
            </Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text style={{ color: servicio.estatus_sistema == 1 ? 'green' : 'red' }}>
                {servicio.estatus_sistema == 1 ? 'ACTIVO' : 'INACTIVO'}
            </Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 5, padding: 5 }}
                onPress={() => handleEdit(servicio)}>
                <Icon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, padding: 5 }}
                onPress={() => confirmDelete(servicio.id_servicio)}>
                <Icon2 name="delete" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    ]);

    const handleSave = async () => {
        if (!nombre || !orden || (estatus != 0 && estatus != 1) || (estatus_web != 0 && estatus_web != 1)
            || (estatus_sistema != 0 && estatus_sistema != 1) || !costo) {
            Alert.alert('Llenar todos los campos', 'Todos los campos son requeridos');
            return;
        }
        const nuevoServicio: NuevoServicio = {
            nombre, descripcion, orden: Number(orden),
            estatus: Number(estatus), estatus_web: Number(estatus_web),
            estatus_sistema: Number(estatus_sistema), costo: Number(costo)
        };
        const response = await createService(nuevoServicio);
        Alert.alert(response.data.message, 'Nuevo registro');
        getServices();

        setNombre('');
        setDescripcion('');
        setOrden('');
        setEstatus(0);
        setEstatus_web(0);
        setEstatus_sistema(0);
        setCosto('');
    };

    const handleEdit = (servicio: Servicio) => {
        setSelectedService(servicio);
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
        const response = await deleteService(id);
        Alert.alert(response.data.message, 'Registro eliminado');
        getServices();
    };

    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.modalTitle}>Servicios</Text>
                    <Text style={styles.modalText}>Médico: {doctor}</Text>

                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                    <TextInput style={[styles.input, styles.bigText]} placeholder="Descripción"
                        multiline={true} numberOfLines={4} value={descripcion} onChangeText={setDescripcion} />
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={estatus} onValueChange={setEstatus}>
                                <Picker.Item label="Estatus" value="" />
                                <Picker.Item label="Sí" value={1} />
                                <Picker.Item label="No" value={0} />
                            </Picker>
                        </View>
                        <TextInput style={styles.input} placeholder="Orden" keyboardType="numeric"
                            value={orden} onChangeText={setOrden} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={estatus_web} onValueChange={setEstatus_web}>
                                <Picker.Item label="Estatus web" value="" />
                                <Picker.Item label="Sí" value={1} />
                                <Picker.Item label="No" value={0} />
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker} selectedValue={estatus_sistema} onValueChange={setEstatus_sistema}>
                                <Picker.Item label="Estatus sistema" value="" />
                                <Picker.Item label="Sí" value={1} />
                                <Picker.Item label="No" value={0} />
                            </Picker>
                        </View>
                    </View>
                    <TextInput style={styles.input} placeholder="Costo" keyboardType="numeric"
                        value={costo} onChangeText={setCosto} />
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleSave}>
                        <Text style={styles.buttonText}>{'Guardar'.toUpperCase()}</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        {selectedService && (
                            <EditServiceModal
                                servicio={selectedService}
                                onClose={closeModal}
                            />
                        )}
                    </Modal>

                    <Text style={styles.modalTitle}>Información general</Text>
                    <ScrollView horizontal>
                        <View style={styles.container}>
                            {servicios.length > 0 ? (
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