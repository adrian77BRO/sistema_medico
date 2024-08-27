import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert, Button, TextInput, Pressable, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Horario, NuevoHorario } from '../models/Schedule';
import { EditScheduleModal } from './EditSchedule';
import {
    getAllSchedules,
    createSchedule,
    deleteSchedule
} from '../api/scheduleEndpoint';

interface SchedulesModalProps {
    visible: boolean;
    onClose: () => void;
    doctor: string;
}

export const SchedulesModal: React.FC<SchedulesModalProps> = ({ visible, onClose, doctor }) => {
    const [dia, setDia] = useState('');
    const [hora_inicio, setHora_inicio] = useState('');
    const [hora_termino, setHora_termino] = useState('');
    const [horarios, setHorarios] = useState<Horario[]>([]);

    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const [stime, setStime] = useState(new Date());
    const [etime, setEtime] = useState(new Date());

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<Horario | null>(null);

    useEffect(() => {
        getSchedules();
    }, []);

    const getSchedules = async () => {
        const response = await getAllSchedules();
        setHorarios(response.data.horarios);
    };

    const closeModal = () => {
        setModalVisible(false);
        getSchedules();
    }

    const tableHead = ['Día', 'Hora inicio', 'Hora fin', 'Acciones'];
    const columnWidths = [100, 100, 100, 100];
    const semana = [
        { dia: 'Lunes', numero: 1 },
        { dia: 'Martes', numero: 2 },
        { dia: 'Miércoles', numero: 3 },
        { dia: 'Jueves', numero: 4 },
        { dia: 'Viernes', numero: 5 },
        { dia: 'Sábado', numero: 6 },
        { dia: 'Domingo', numero: 7 }
    ];

    const tableData = horarios.map((horario) => [
        <View style={styles.tableContainer}>
            <Text>
                {horario.dia == 1 && 'Lunes'}
                {horario.dia == 2 && 'Martes'}
                {horario.dia == 3 && 'Miércoles'}
                {horario.dia == 4 && 'Jueves'}
                {horario.dia == 5 && 'Viernes'}
                {horario.dia == 6 && 'Sábado'}
                {horario.dia == 7 && 'Domingo'}
            </Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{horario.hora_inicio}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{horario.hora_termino}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="E" color='blue' onPress={() => handleEdit(horario)} />
            <Button title="D" color="red" onPress={() => confirmDelete(horario.id_horario)} />
        </View>
    ]);

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
        const nuevoHorario: NuevoHorario = {
            dia: Number(dia), hora_inicio, hora_termino
        };
        const response = await createSchedule(nuevoHorario);
        Alert.alert(response.data.message, 'Nuevo registro');
        getSchedules();

        setDia('');
        setHora_inicio('');
        setHora_termino('');
    };

    const handleEdit = (horario: Horario) => {
        setSelectedSchedule(horario);
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
        const response = await deleteSchedule(id);
        Alert.alert(response.data.message, 'Registro eliminado');
        getSchedules();
    };

    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.modalTitle}>Horarios</Text>
                    <Text style={styles.modalText}>Médico: {doctor}</Text>

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
                        <Text style={styles.buttonText}>{'Guardar'.toUpperCase()}</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        {selectedSchedule && (
                            <EditScheduleModal
                                horario={selectedSchedule}
                                onClose={closeModal}
                            />
                        )}
                    </Modal>

                    <Text style={styles.modalTitle}>Información general</Text>
                    <ScrollView horizontal>
                        <View style={styles.container}>
                            {horarios.length > 0 ? (
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