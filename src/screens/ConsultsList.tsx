import React, { useState, useEffect, useCallback } from 'react';
import {
    View, Text, TextInput, ScrollView, Linking,
    Pressable, Platform, TouchableOpacity, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { encode as base64_encode } from 'base-64';

import { Consulta } from '../models/Consult';
import {
    getAllConsults,
    getConsultsByPatient,
    getConsultsByDate,
    getConsultsByStatus
} from '../api/consultEndpoint';
import { RootStackParamList } from '../rootTypes';

type ConsultsListScreenProps = NativeStackScreenProps<RootStackParamList, 'ConsultsListScreen'>;

export const ConsultsListScreen: React.FC<ConsultsListScreenProps> = () => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [paciente, setPaciente] = useState('');
    const [fecha, setFecha] = useState('');
    const [estatus, setEstatus] = useState(0);

    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        getConsults();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getConsults();
        }, [])
    );

    const formatDate = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onChangeDate = async (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setFecha(formatDate(currentDate));
        if (fecha) {
            const response = await getConsultsByDate(formatDate(currentDate));
            setConsultas(response.data.consultas);
        } else {
            getConsults();
        }
        setEstatus(1);
        setPaciente('');
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const getConsults = async () => {
        const response = await getAllConsults();
        setConsultas(response.data.consultas);
    };

    const handleSearch = async (nombre: string) => {
        setPaciente(nombre);
        if (nombre) {
            const response = await getConsultsByPatient(nombre);
            setConsultas(response.data.consultas);
        } else {
            getConsults();
        }
        setEstatus(1);
        setFecha('');
    };

    const handleStatus = async (estatus: number) => {
        setEstatus(estatus);
        if (estatus == 2) {
            getConsults();
        } else {
            const response = await getConsultsByStatus(estatus);
            setConsultas(response.data.consultas);
        }
        setPaciente('');
        setFecha('');
    };

    const handlePress = (id: number) => {
        let encoded = base64_encode(id.toString());
        Linking.openURL(`https://saludconfiable.com.mx/admin/imprimir/print.php?id=${encoded}`);
    };

    const formatDateISO = (dateISO: string) => {
        const date = new Date(dateISO);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const tableHead = ['Paciente', 'Médico', 'Info. pagos', 'Diagnóstico', 'Nota médica', 'Acciones'];
    const columnWidths = [200, 200, 200, 150, 150, 100];

    const tableData = consultas.map((consulta) => [
        <View style={styles.tableContainer}>
            <Text>{consulta.paciente}</Text>
            <Text>{formatDateISO(consulta.fecha_consulta)}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{consulta.medico}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Monto total: {consulta.costo}</Text>
            <Text>Monto pagado: {consulta.monto_pagado}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{consulta.diagnostico}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>{consulta.padecimientos}</Text>
        </View>,
        <View style={[styles.tableContainer, styles.actionButtons]}>
            <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: 5, padding: 5 }}
                onPress={() => handlePress(consulta.id_consulta)}>
                <Icon name="printer" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    ]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputRow}>
                    <TextInput style={styles.input} placeholder="Buscar por nombre" value={paciente} onChangeText={handleSearch} />
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={estatus} style={styles.picker} onValueChange={handleStatus}>
                            <Picker.Item label="Todos" value={2} />
                            <Picker.Item label="Por pagar" value={0} />
                            <Picker.Item label="Pagado" value={1} />
                        </Picker>
                    </View>
                </View>
                <Pressable onPress={showDatepicker}>
                    <TextInput style={styles.input} value={fecha ? date.toLocaleDateString('es-MX') : 'Buscar por consulta'} editable={false} />
                    {showDate && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="spinner"
                            onChange={onChangeDate}
                        />
                    )}
                </Pressable>
                <ScrollView horizontal style={{ marginTop: 20 }}>
                    <View>
                        {consultas.length > 0 ? (
                            <>
                                <View style={[styles.row, styles.headerRow]}>
                                    {tableHead.map((header, index) => (
                                        <View key={index} style={[styles.cell, { width: columnWidths[index] }]}>
                                            <Text style={styles.text}>{header}</Text>
                                        </View>
                                    ))}
                                </View>
                                {tableData.map((rowData, rowIndex) => (
                                    <View key={rowIndex} style={styles.row}>
                                        {rowData.map((cellData, cellIndex) => (
                                            <View key={cellIndex} style={{
                                                borderColor: '#34dbb8',
                                                borderRightWidth: 1,
                                                width: columnWidths[cellIndex]
                                            }}>
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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20
    },
    headerRow: {
        height: 40,
        backgroundColor: '#34dbb8'
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
    inputRow: {
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
    row: {
        flexDirection: 'row',
        height: 75,
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
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});