import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { updateSchedule } from '../api/scheduleEndpoint';
import { Horario, NuevoHorario } from '../models/Schedule';
import { ScrollView } from 'react-native-gesture-handler';

interface EditScheduleProps {
    horario: Horario;
    onClose: () => void;
}

export const EditScheduleModal: React.FC<EditScheduleProps> = ({ horario, onClose }) => {
    const [dia, setDia] = useState(horario.dia.toString());
    const [hora_inicio, setHora_inicio] = useState(horario.hora_inicio);
    const [hora_termino, setHora_termino] = useState(horario.hora_termino);

    const semana = [
        { dia: 'Lunes', numero: 1 },
        { dia: 'Martes', numero: 2 },
        { dia: 'Miércoles', numero: 3 },
        { dia: 'Jueves', numero: 4 },
        { dia: 'Viernes', numero: 5 },
        { dia: 'Sábado', numero: 6 },
        { dia: 'Domingo', numero: 7 }
    ];

    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const [stime, setStime] = useState(new Date());
    const [etime, setEtime] = useState(new Date());

    const onChangeStartTime = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || stime;
        setShowStartTime(Platform.OS === 'ios');
        setStime(currentTime);
        setHora_inicio(formatTime(currentTime));
    };

    const onChangeEndTime = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || etime;
        setShowEndTime(Platform.OS === 'ios');
        setEtime(currentTime);
        setHora_termino(formatTime(currentTime));
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const showStartTimepicker = () => {
        setShowStartTime(true);
    };

    const showEndTimepicker = () => {
        setShowEndTime(true);
    };

    const handleSave = async () => {
        const horarioEditar: NuevoHorario = {
            dia: Number(dia), hora_inicio, hora_termino
        };
        const response = await updateSchedule(horario.id_horario, horarioEditar);
        Alert.alert(response.data.message, 'Registro guardado');
    };

    return (
        <View style={styles.modalContent}>
            <ScrollView>
                <Text style={styles.modalTitle}>Editar horario</Text>
                <View style={styles.pickerContainer}>
                    <Picker style={styles.picker} selectedValue={dia} onValueChange={setDia}>
                        <Picker.Item label="Día" value="" />
                        {semana.map((dia, index) => (
                            <Picker.Item key={index} label={dia.dia} value={dia.numero} />
                        ))}
                    </Picker>
                </View>
                <Pressable onPress={showStartTimepicker}>
                    <View>
                        <TextInput style={styles.input} value={hora_inicio ? formatTime(stime) : 'Hora inicio'} editable={false} />
                        {showStartTime && (
                            <DateTimePicker
                                value={stime || new Date()}
                                mode="time"
                                display="spinner"
                                onChange={onChangeStartTime}
                            />
                        )}
                    </View>
                </Pressable>
                <Pressable onPress={showEndTimepicker}>
                    <View>
                        <TextInput style={styles.input} value={hora_termino ? formatTime(etime) : 'Hora fin'} editable={false} />
                        {showEndTime && (
                            <DateTimePicker
                                value={etime || new Date()}
                                mode="time"
                                display="spinner"
                                onChange={onChangeEndTime}
                            />
                        )}
                    </View>
                </Pressable>
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