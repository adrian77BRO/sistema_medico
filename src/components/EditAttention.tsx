import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { updateAttention } from '../api/attentionEndpoint';
import { Atencion, NuevaAtencion } from '../models/Attention';
import { ScrollView } from 'react-native-gesture-handler';

interface EditAttentionProps {
    atencion: Atencion;
    onClose: () => void;
}

export const EditAttentionModal: React.FC<EditAttentionProps> = ({ atencion, onClose }) => {
    const [nombre, setNombre] = useState(atencion.nombre);
    const [descripcion, setDescripcion] = useState(atencion.descripcion);
    const [sintomas, setSintomas] = useState(atencion.sintomas);
    const [causas, setCausas] = useState(atencion.causas);
    const [estatus, setEstatus] = useState(atencion.estatus);

    const handleSave = async () => {
        if (!nombre || (estatus != 0 && estatus != 1)) {
            Alert.alert('Llenar todos los campos', 'Todos los campos son requeridos');
            return;
        }
        const atencionEditar: NuevaAtencion = {
            nombre, descripcion, sintomas,
            causas, estatus: Number(estatus)
        };
        const response = await updateAttention(atencion.id_atencion_medica, atencionEditar);
        Alert.alert(response.data.message, 'Registro guardado');
    };

    return (
        <View style={styles.modalContent}>
            <ScrollView>
                <Text style={styles.modalTitle}>Editar atención médica</Text>
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