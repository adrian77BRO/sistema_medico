import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, TextInput, Platform, Alert, FlatList,
    Pressable, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { PatientDetailsModal } from '../components/PatientDetails';
import { RootStackParamList } from '../rootTypes';
import { NuevaCita } from '../models/Appointment';
import { Paciente } from '../models/Patient';
import { createAppointment } from '../api/appointmentEndpoint';
import { getPatientsByName } from '../api/patientEndpoint';
import { Historial } from '../models/History';
import { getHistoryById } from '../api/historyEndpoint';

type AppointmentFormScreenProps = NativeStackScreenProps<RootStackParamList, 'AppointmentFormScreen'>;

export const AppointmentFormScreen: React.FC<AppointmentFormScreenProps> = ({ navigation }) => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [paciente, setPaciente] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [historial, setHistorial] = useState<Historial | null>(null);

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [selectedIdPat, setSelectedIdPat] = useState(0);
    const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [modalDetails, setModalDetails] = useState(false);

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

    const handleViewDetails = () => {
        setModalDetails(true);
    };

    const handleSave = async () => {
        if (!fecha || !hora || !selectedPatient) {
            Alert.alert('Llenar todos los campos', 'Todos los campos son requeridos');
            return;
        }
        const nuevaCita: NuevaCita = {
            id_paciente: selectedIdPat,
            fecha: fecha + ' ' + hora,
            observaciones
        };
        const response = await createAppointment(nuevaCita);
        Alert.alert(response.data.message, 'Nuevo registro');

        setFecha('');
        setObservaciones('');
        navigation.goBack();
    };

    const handleSearch = async (nombre: string) => {
        setPaciente(nombre);
        if (nombre) {
            const response = await getPatientsByName(nombre);
            setPacientes(response.data.pacientes);
        } else {
            setPacientes([]);
            setSelectedPatient(null);
        }
    };

    const getHistory = async (id: number) => {
        const response = await getHistoryById(id);
        setHistorial(response.data.historial);
    };

    const selectPatient = (paciente: Paciente) => {
        setSelectedPatient(paciente);
        setSelectedIdPat(paciente.id_paciente);
        getHistory(paciente.id_paciente);
        setPacientes([]);
        setPaciente(paciente.nombre + ' ' + paciente.apellidos);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.title}>Nueva cita</Text>
                <TextInput style={styles.input} placeholder="Buscar paciente por nombre" value={paciente} onChangeText={handleSearch} />
                {selectedPatient && (
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'blue', margin: 10 }]} onPress={handleViewDetails}>
                        <Text style={styles.buttonText}>INFO DEL PACIENTE</Text>
                    </TouchableOpacity>
                )}
                {pacientes.length > 0 && (
                    <FlatList
                        data={pacientes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.row}>
                                <Text style={{ marginTop: 10 }}>{item.nombre} {item.apellidos}</Text>
                                <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: 5, padding: 5 }}
                                    onPress={() => selectPatient(item)}>
                                    <Icon name="check" size={25} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        }
                        scrollEnabled={false}
                    />
                )}
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
            {selectedPatient && (
                <PatientDetailsModal
                    visible={modalDetails}
                    onClose={() => setModalDetails(false)}
                    paciente={selectedPatient}
                    historial={historial}
                />
            )}
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