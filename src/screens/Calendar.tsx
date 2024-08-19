import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

export const CalendarScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione una fecha para ver las citas</Text>
            <Calendar
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
                    <Text>No hay citas programadas para esta fecha.</Text>
                </View>
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
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    appointmentContainer: {
        marginTop: 20,
    },
    appointmentText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});