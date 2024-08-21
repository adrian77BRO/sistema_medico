import React, { useState } from 'react';
import { View, Text, TextInput, Platform, Pressable, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { RootStackParamList } from '../rootTypes';
import { Patient } from '../models/Patient';

type PatientFormScreenProps = NativeStackScreenProps<RootStackParamList, 'PatientFormScreen'>;

export const PatientFormScreen: React.FC<PatientFormScreenProps> = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [relative, setRelative] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const handleSave = () => {
        const newPatient: Patient = {
            id: Math.random().toString(),
            name,
            lastName,
            email,
            phone,
            address,
            relative,
            gender,
            birth,
        };
        route.params.onSave(newPatient);
        navigation.goBack();
    };

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setBirth(currentDate.toLocaleDateString('es-MX'));
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const handlePhoneNumberChange = (input: string) => {
        const formattedInput = input.replace(/[^0-9]/g, '');

        if (formattedInput.length <= 10) {
            setPhone(formattedInput);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.title}>Datos del paciente</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Nombre(s)" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Apellidos" value={lastName} onChangeText={setLastName} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Teléfono" keyboardType="numeric" maxLength={10} value={phone}
                        onChangeText={handlePhoneNumberChange} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Dirección" value={address} onChangeText={setAddress} />
                    <TextInput style={styles.input} placeholder="Familiar responsable" value={relative} onChangeText={setRelative} />
                </View>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={gender} style={styles.picker} onValueChange={(itemValue) => setGender(itemValue)}>
                        <Picker.Item label="Sexo" value="" />
                        <Picker.Item label="Hombre" value="Hombre" />
                        <Picker.Item label="Mujer" value="Mujer" />
                    </Picker>
                </View>
                <Pressable onPress={showDatepicker}>
                    <TextInput style={styles.input} value={birth ? date.toLocaleDateString('es-MX') : 'Fecha de nacimiento'} editable={false} />
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