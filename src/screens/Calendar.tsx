import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { format } from 'date-fns';

import { Cita } from '../models/Appointment';
import { getAppointmentsByDate } from '../api/appointmentEndpoint';

export const CalendarScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [calendarKey, setCalendarKey] = useState<number>(0);
    const [citas, setCitas] = useState<Cita[]>([]);

    const handleDayPress = async (day: DateData) => {
        setSelectedDate(day.dateString);
        const response = await getAppointmentsByDate(day.dateString);
        setCitas(response.data.citas);
    };

    const handleTodayPress = async () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        setSelectedDate(today);
        setCurrentDate(today);
        setCalendarKey(prevKey => prevKey + 1);
        const response = await getAppointmentsByDate(today);
        setCitas(response.data.citas);
    };

    const formatTime = (hora: string) => {
        const date = new Date(hora);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Seleccione una fecha</Text>
                <TouchableOpacity style={styles.button} onPress={handleTodayPress}>
                    <Text style={styles.buttonText}>{'Ver citas de hoy'.toUpperCase()}</Text>
                </TouchableOpacity>
                <Calendar
                    key={calendarKey}
                    current={currentDate}
                    onDayPress={handleDayPress}
                    markedDates={{
                        [selectedDate ?? '']: {
                            selected: true,
                            marked: true,
                            selectedColor: 'blue',
                        },
                    }}
                />
                {selectedDate && (
                    <View style={styles.appointmentContainer}>
                        <Text style={styles.appointmentText}>
                            Citas para el {selectedDate}:
                        </Text>
                        {citas.length > 0 ? (
                            <FlatList
                                data={citas}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View style={styles.row}>
                                        <Text style={{ margin: 10 }}>{formatTime(item.fecha)} - {item.paciente}</Text>
                                    </View>
                                }
                                scrollEnabled={false}
                            />
                        ) :
                            <Text style={{ textAlign: 'center' }}>
                                {'No hay citas programadas para esta fecha'.toUpperCase()}
                            </Text>
                        }
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
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
        backgroundColor: 'yellow',
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    appointmentContainer: {
        borderColor: 'green',
        margin: 20,
    },
    appointmentText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
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