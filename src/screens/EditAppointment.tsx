import React, { useState } from 'react';
import { View, Text, TextInput, Platform, FlatList, Alert, Button, Pressable, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { RootStackParamList } from '../rootTypes';
import { EditarCita } from '../models/Appointment';
import { updateAppointment } from '../api/appointmentEndpoint';

type EditAppointmentScreenProps = NativeStackScreenProps<RootStackParamList, 'EditAppointmentScreen'>;

export const EditAppointmentScreen: React.FC<EditAppointmentScreenProps> = ({ route, navigation }) => {
    const { cita } = route.params;
    const [paciente, setPaciente] = useState(cita.paciente);
    const [observaciones, setObservaciones] = useState(cita.observaciones);

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const formatEditDate = (fecha: string) => {
        const date = new Date(fecha);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formatEditTime = (hora: string) => {
        const date = new Date(hora);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    const [fecha, setFecha] = useState(formatEditDate(cita.fecha));
    const [hora, setHora] = useState(formatEditTime(cita.fecha));

    const formatDate = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const onChangeDate = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setFecha(formatDate(currentDate));
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const onChangeTime = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
        setHora(formatTime(currentTime));
    };

    const showTimepicker = () => {
        setShowTime(true);
    };

    const handleSave = async () => {
        if (!fecha || !hora) {
            Alert.alert('Llenar todos los campos', 'Todos los campos son requeridos');
            return;
        }
        const editarCita: EditarCita = {
            fecha: fecha + ' ' + hora,
            observaciones
        };
        const response = await updateAppointment(cita.id_cita, editarCita);
        Alert.alert(response.data.message, 'Registro actualizado');

        setFecha('');
        setObservaciones('');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.title}>Editar cita</Text>
                <TextInput style={styles.input} placeholder="Buscar paciente por nombre" value={paciente} editable={false} />
                <Pressable onPress={showDatepicker}>
                    <TextInput style={styles.input} value={fecha ? date.toLocaleDateString('es-MX') : 'Fecha cita'} editable={false} />
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
                        <TextInput style={styles.input} value={hora ? formatTime(time) : 'Hora cita'} editable={false} />
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
                    value={observaciones} onChangeText={setObservaciones} />
                <TouchableOpacity style={[styles.button, { backgroundColor: 'green', marginTop: 20 }]} onPress={handleSave}>
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
        marginVertical: 10,
    },
    row: {
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        borderRadius: 10,
        alignItems: 'center',
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