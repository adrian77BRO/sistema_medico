import React, { useState } from 'react';
import { View, Text, TextInput, Platform, Alert, Pressable, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { RootStackParamList } from '../rootTypes';
import { NuevoPaciente } from '../models/Patient';
import { createPatient } from '../api/patientEndpoint';

type PatientFormScreenProps = NativeStackScreenProps<RootStackParamList, 'PatientFormScreen'>;

export const PatientFormScreen: React.FC<PatientFormScreenProps> = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [familiar_responsable, setFamiliar_responsable] = useState('');
    const [sexo, setSexo] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const handleSave = async () => {
        const nuevoPaciente: NuevoPaciente = {
            nombre, apellidos, correo, telefono,
            direccion, familiar_responsable,
            sexo: Number(sexo), fecha_nacimiento
        };
        const response = await createPatient(nuevoPaciente);
        Alert.alert(response.data.message, 'Nuevo registro');

        setNombre('');
        setApellidos('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
        setFamiliar_responsable('');
        setSexo('');
        setFecha_nacimiento('');

        navigation.goBack();
    };

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setFecha_nacimiento(formatDateISO(currentDate));
    };

    const formatDateISO = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const showDatepicker = () => {
        setShow(true);
    };

    const handlePhoneNumberChange = (input: string) => {
        const formattedInput = input.replace(/[^0-9]/g, '');

        if (formattedInput.length <= 10) {
            setTelefono(formattedInput);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.title}>Datos del paciente</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Nombre(s)" value={nombre} onChangeText={setNombre} />
                    <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
                    <TextInput style={styles.input} placeholder="Teléfono" keyboardType="numeric" maxLength={10} value={telefono}
                        onChangeText={handlePhoneNumberChange} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
                    <TextInput style={styles.input} placeholder="Familiar responsable" value={familiar_responsable}
                        onChangeText={setFamiliar_responsable} />
                </View>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={sexo} style={styles.picker} onValueChange={setSexo}>
                        <Picker.Item label="Sexo" value="" />
                        <Picker.Item label="Hombre" value={1} />
                        <Picker.Item label="Mujer" value={2} />
                    </Picker>
                </View>
                <Pressable onPress={showDatepicker}>
                    <TextInput style={styles.input} value={fecha_nacimiento ? date.toLocaleDateString('en-US')
                        : 'Fecha de nacimiento'} editable={false} />
                    {show && (
                        <DateTimePicker value={date || new Date()} mode="date" display="spinner" onChange={onChange} />
                    )}
                </Pressable>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>{'Guardar'.toUpperCase()}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
});