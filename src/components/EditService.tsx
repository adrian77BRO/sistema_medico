import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { updateService } from '../api/serviceEndpoint';
import { Servicio, NuevoServicio } from '../models/Service';
import { ScrollView } from 'react-native-gesture-handler';

interface EditServiceProps {
    servicio: Servicio;
    onClose: () => void;
}

export const EditServiceModal: React.FC<EditServiceProps> = ({ servicio, onClose }) => {
    const [nombre, setNombre] = useState(servicio.nombre);
    const [descripcion, setDescripcion] = useState(servicio.descripcion);
    const [orden, setOrden] = useState(servicio.orden.toString());
    const [estatus, setEstatus] = useState(servicio.estatus);
    const [estatus_web, setEstatus_web] = useState(servicio.estatus_web);
    const [estatus_sistema, setEstatus_sistema] = useState(servicio.estatus_sistema);
    const [costo, setCosto] = useState(servicio.costo.toString());

    const handleSave = async () => {
        if (!nombre || !orden || (estatus != 0 && estatus != 1) || (estatus_web != 0 && estatus_web != 1)
            || (estatus_sistema != 0 && estatus_sistema != 1) || !costo) {
            Alert.alert('Llenar todos los campos', 'Todos los campos son requeridos');
            return;
        }
        const servicioEditar: NuevoServicio = {
            nombre, descripcion, orden: Number(orden),
            estatus: Number(estatus), estatus_web: Number(estatus_web),
            estatus_sistema: Number(estatus_sistema), costo: Number(costo)
        };
        const response = await updateService(servicio.id_servicio, servicioEditar);
        Alert.alert(response.data.message, 'Registro guardado');
    };

    return (
        <View style={styles.modalContent}>
            <ScrollView>
                <Text style={styles.modalTitle}>Editar servicio</Text>
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
                    <Text style={styles.buttonText}>{'Guardar cambios'.toUpperCase()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onClose}>
                    <Text style={styles.buttonText}>{'Cancelar'.toUpperCase()}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
});