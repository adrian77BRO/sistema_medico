import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

import { RootStackParamList } from '../rootTypes';
import { Consult } from '../models/Consult';

type ConsultFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ConsultFormScreen'>;

export const ConsultFormScreen: React.FC<ConsultFormScreenProps> = ({ navigation, route }) => {
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [suffering, setSuffering] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [temperature, setTemperature] = useState('');
    const [pressure, setPressure] = useState('');
    const [mass, setMass] = useState('');
    const [saturation, setSaturation] = useState('');
    const [dateAppoint, setDateAppoint] = useState('');
    const [dateConsult, setDateConsult] = useState('');
    const [cost, setCost] = useState('');
    const [amount, setAmount] = useState('');
    const [observations, setObservations] = useState('');
    const [statusPaid, setStatusPaid] = useState('');
    const [statusConsult, setStatusConsult] = useState('');
    const [service, setService] = useState('');

    const handleSave = () => {
        const newConsult: Consult = {
            id: Math.random().toString(), patient, doctor,
            suffering, diagnosis, weight, height, temperature,
            pressure, mass, saturation, dateAppoint,
            dateConsult: new Date().toLocaleDateString('es-MX'),
            cost, amount, observations,
            statusPaid: 'Por pagar',
            statusConsult: 'Por atender'
        };
        route.params.onSave(newConsult);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.title}>Estado actual</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Peso" value={weight} onChangeText={setWeight} />
                    <TextInput style={styles.input} placeholder="Estatura" value={height} onChangeText={setHeight} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Presión" value={pressure} onChangeText={setPressure} />
                    <TextInput style={styles.input} placeholder="Temperatura" value={temperature} onChangeText={setTemperature} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Masa corporal" value={mass} onChangeText={setMass} />
                    <TextInput style={styles.input} placeholder="Saturación" value={saturation} onChangeText={setSaturation} />
                </View>
                <Text style={styles.subtitle}></Text>
                <TextInput style={[styles.input, styles.bigText]} placeholder="Antecedentes y padecimientos"
                    multiline={true} numberOfLines={4} value={suffering} onChangeText={setSuffering} />
                <TextInput style={[styles.input, styles.bigText]} placeholder="Diagnósticos" multiline={true}
                    numberOfLines={4} value={diagnosis} onChangeText={setDiagnosis} />
                <TextInput style={[styles.input, styles.bigText]} placeholder="Observaciones" multiline={true}
                    numberOfLines={4} value={observations} onChangeText={setObservations} />
                <Text style={styles.title}>Pagos</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={service} style={styles.picker} onValueChange={(itemValue) => setService(itemValue)}>
                        <Picker.Item label="Servicio" value="" />
                        <Picker.Item label="Consulta general" value="Consulta general" />
                        <Picker.Item label="Cirugía" value="Cirugía" />
                    </Picker>
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Total" value={cost}
                        keyboardType="numeric" onChangeText={setCost} />
                    <TextInput style={styles.input} placeholder="Monto a pagar" value={amount}
                        keyboardType="numeric" onChangeText={setAmount} />
                </View>
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
        padding: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10
    },
    subtitle: {
        marginTop: 10,
        marginLeft: 5
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