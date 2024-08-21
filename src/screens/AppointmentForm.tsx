import React, { useState } from 'react';
import { View, Text, TextInput, Platform, Pressable, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { RootStackParamList } from '../rootTypes';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';

type AppointmentFormScreenProps = NativeStackScreenProps<RootStackParamList, 'AppointmentFormScreen'>;

export const AppointmentFormScreen: React.FC<AppointmentFormScreenProps> = ({ navigation, route }) => {
    const [dateApp, setDateApp] = useState('');
    const [timeApp, setTimeApp] = useState('');
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [observations, setObservations] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const handleSave = () => {
        const newAppointment: Appointment = {
            id: Math.random().toString(),
            date: dateApp,
            time: timeApp,
            patient,
            doctor,
            status: 'Por atender',
            observations
        };
        route.params.onSave(newAppointment);
        navigation.goBack();
    };

    const onChangeDate = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setDateApp(currentDate.toLocaleDateString('es-MX'));
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const onChangeTime = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
        setTimeApp(formatTime(currentTime));
    };

    const showTimepicker = () => {
        setShowTime(true);
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.title}>Nueva cita</Text>
                <TextInput style={styles.input} placeholder="Nombre del paciente" value={patient} onChangeText={setPatient} />
                <Pressable onPress={showDatepicker}>
                    <TextInput style={styles.input} value={dateApp ? date.toLocaleDateString('es-MX') : 'Fecha cita'} editable={false} />
                    {showDate && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="spinner"
                            onChange={onChangeDate}
                        />
                    )}
                </Pressable>
                <Pressable onPress={showTimepicker}>
                    <View>
                        <TextInput style={styles.input} value={timeApp ? formatTime(time) : 'Hora cita'} editable={false} />
                        {showTime && (
                            <DateTimePicker
                                value={time || new Date()}
                                mode="time"
                                display="spinner"
                                onChange={onChangeTime}
                            />
                        )}
                    </View>
                </Pressable>
                <TextInput style={styles.bigText} placeholder="Observaciones" multiline={true} numberOfLines={4}
                    value={observations} onChangeText={setObservations} />
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
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    bigText: {
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        height: 80,
        textAlignVertical: 'top',
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