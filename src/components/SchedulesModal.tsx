import React, { useState } from 'react';
import { View, Text, Modal, Button, TextInput, Platform, Pressable, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Schedule } from '../models/Schedule';

interface SchedulesModalProps {
    visible: boolean;
    onClose: () => void;
}

export const SchedulesModal: React.FC<SchedulesModalProps> = ({ visible, onClose }) => {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const [stime, setStime] = useState(new Date());
    const [etime, setEtime] = useState(new Date());

    const tableHead = ['Día', 'Hora inicio', 'Hora fin', 'Acciones'];
    const columnWidths = [100, 100, 100, 100];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const tableData = schedules.map((schedule) => [
        <View style={styles.tableContainer}>
            <Text>{schedule.day}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{schedule.startTime}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{schedule.endTime}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <Button title="E" color='blue' />
            <Button title="D" color="red" />
        </View>
    ]);

    const handleSave = () => {
        const newSchedule: Schedule = {
            id: Math.random().toString(),
            day,
            startTime,
            endTime
        };
        setSchedules((prev) => [...prev, newSchedule]);
    };

    const onChangeStartTime = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || stime;
        setShowStartTime(Platform.OS === 'ios');
        setStime(currentTime);
        setStartTime(formatTime(currentTime));
    };

    const onChangeEndTime = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || etime;
        setShowEndTime(Platform.OS === 'ios');
        setEtime(currentTime);
        setEndTime(formatTime(currentTime));
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

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.modalTitle}>Horarios</Text>
                    <Text style={styles.modalText}>Médico: Armando Perea Orozco</Text>

                    <View style={styles.pickerContainer}>
                        <Picker style={styles.picker} selectedValue={day} onValueChange={setDay}>
                            <Picker.Item label="Día" value="" />
                            {days.map((day, index) => (
                                <Picker.Item key={index} label={day} value={day} />
                            ))}
                        </Picker>
                    </View>
                    <Pressable onPress={showStartTimepicker}>
                        <View>
                            <TextInput style={styles.input} value={startTime ? formatTime(stime) : 'Hora inicio'} editable={false} />
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
                            <TextInput style={styles.input} value={endTime ? formatTime(etime) : 'Hora fin'} editable={false} />
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

                    <Text style={styles.modalTitle}>Información general</Text>
                    <ScrollView horizontal>
                        <View style={styles.container}>
                            {schedules.length > 0 ? (
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
    input: {
        flex: 2,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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