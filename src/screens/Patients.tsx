import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../rootTypes';

import { Patient } from '../models/Patient';
import { PatientsTable } from '../components/PatientsTable';

type PatientsScreenProps = NativeStackScreenProps<RootStackParamList, 'PatientsScreen'>;

export const PatientsScreen: React.FC<PatientsScreenProps> = ({ navigation }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    //const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    //const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    //const [searchTerm, setSearchTerm] = useState('');

    /*useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(patients);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = patients.filter((patient) =>
                patient.name.toLowerCase().includes(lowercasedSearchTerm) ||
                patient.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
                patient.phone.includes(lowercasedSearchTerm)
            );
            setFilteredPatients(filtered);
        }
    }, [searchTerm, patients]);

    const handleAddEditPatient = (newPatient: Patient) => {
        if (selectedPatient) {
            setPatients((prev) =>
                prev.map((patient) =>
                    patient.id === selectedPatient.id ? newPatient : patient
                )
            );
        } else {
            setPatients((prev) => [...prev, newPatient]);
        }
        setSelectedPatient(null);
    };*/

    const handleAddPatient = () => {
        navigation.navigate('PatientFormScreen', {
            onSave: (newPatient: Patient) => {
                setPatients((prev) => [...prev, newPatient]);
            },
        });
    };

    const handleEditPatient = (patient: Patient) => {

    };

    const handleDeletePatient = (id: string) => {
        setPatients((prev) => prev.filter((patient) => patient.id !== id));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
                    <Text style={styles.buttonText}>{'Registrar paciente'.toUpperCase()}</Text>
                </TouchableOpacity>
                <ScrollView horizontal style={{ marginTop: 20 }}>
                    <PatientsTable
                        patients={patients}
                        onEdit={handleEditPatient}
                        onDelete={handleDeletePatient}
                    />
                </ScrollView>
            </View>
        </ScrollView>
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
        marginBottom: 20,
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