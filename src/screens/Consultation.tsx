import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, Modal, TextInput, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

type Consultation = {
    id: string;
    patient: string;
    doctor: string;
    suffering: string;
    diagnosis: string;
    prescription: string;
    weight: string;
    height: string;
    temperature: string;
    pressure: string;
    mass: string;
    saturation: string;
};

export const ConsultationsScreen: React.FC = () => {
    /*const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);*/
    const [modalVisible, setModalVisible] = useState(false);
    //const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
    /*const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [suffering, setSuffering] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [temperature, setTemperature] = useState('');
    const [pressure, setPressure] = useState('');
    const [mass, setMass] = useState('');
    const [saturation, setSaturation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredConsultations(consultations);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = consultations.filter((consultation) =>
                consultation.name.toLowerCase().includes(lowercasedSearchTerm) ||
                consultation.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
                consultation.phone.includes(lowercasedSearchTerm)
            );
            setFilteredConsultations(filtered);
        }
    }, [searchTerm, consultations]);

    const handleAddEditConsultation = () => {
        if (selectedConsultation) {
            setConsultations((prev) =>
                prev.map((consultation) =>
                    consultation.id === selectedConsultation.id
                        ? {
                            ...consultation, patient: patient, doctor: doctor, suffering: suffering,
                            diagnosis: diagnosis, prescription: prescription, weight: weight, height: height,
                            temperature: temperature, pressure: pressure, mass: mass, saturation: saturation

                        }
                        : consultation
                )
            );
        } else {
            const consultation: Consultation = {
                id: Math.random().toString(),
                patient: patient,
                doctor: doctor,
                suffering: suffering,
                diagnosis: diagnosis,
                prescription: prescription,
                weight: weight,
                height: height,
                temperature: temperature,
                pressure: pressure,
                mass: mass,
                saturation: saturation
            };
            setConsultations((prev) => [...prev, consultation]);
        }
        setModalVisible(false);
        setPatient('');
        setDoctor('');
        setSuffering('');
        setDiagnosis('');
        setPrescription('');
        setWeight('');
        setHeight('');
        setTemperature('');
        setPressure('');
        setMass('');
        setSaturation('');
        setSelectedConsultation(null);
    };

    const handleDeleteConsultation = (id: string) => {
        setConsultations((prev) => prev.filter((consultation) => consultation.id !== id));
    };

    const handleEditConsultation = (consultation: Consultation) => {
        setSelectedConsultation(consultation);
        setPatient(consultation.patient);
        setDoctor(consultation.doctor);
        setSuffering(consultation.suffering);
        setDiagnosis(consultation.diagnosis);
        setPrescription(consultation.prescription);
        setWeight(consultation.weight);
        setHeight(consultation.height);
        setTemperature(consultation.temperature);
        setPressure(consultation.pressure);
        setMass(consultation.mass);
        setSaturation(consultation.saturation);
        setModalVisible(true);
    };*/

    const tableHead = [
        <Text style={styles.textHead}>Nombre</Text>,
        <Text style={styles.textHead}>Info.</Text>,
        <Text style={styles.textHead}>Info. pagos</Text>,
        <Text style={styles.textHead}>Por atender</Text>,
        <Text style={styles.textHead}>Atendido</Text>,
        <Text style={styles.textHead}>Cancelado</Text>,
        <Text style={styles.textHead}>Acciones</Text>,
    ];

    /*const tableData = consultations.map((consultation) => [
        <View style={styles.tableContainer}>
            <Text style={{ padding: 4 }}>{consultation.name} {consultation.lastName}</Text>
            <Text style={{ backgroundColor: 'green', color: '#fff', borderRadius: 30, padding: 4 }}>{consultation.gender}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Email: {consultation.email}</Text>
            <Text>Tel: {consultation.phone}</Text>
            <Text>Nacimiento: {consultation.birth}</Text>
        </View>,
        <View style={styles.tableContainer}>
            <Text>Monto total: $1,100.00</Text>
            <Text>Monto pagado: $600.00</Text>
            <Text>Monto restante: $500.00</Text>
        </View>,
        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'orange' }}>1</Text>,
        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'green' }}>2</Text>,
        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'red' }}>3</Text>,
        <View style={styles.actionButtons}>
            <Button title="E" onPress={() => handleEditConsultation(consultation)} />
            <Button title="D" onPress={() => handleDeleteConsultation(consultation.id)} color="red" />
            <Button title="E" onPress={() => handleEditConsultation(consultation)} />
            <Button title="D" onPress={() => handleDeleteConsultation(consultation.id)} color="red" />
            <Button title="E" onPress={() => handleEditConsultation(consultation)} />
            <Button title="D" onPress={() => handleDeleteConsultation(consultation.id)} color="red" />
        </View>,
    ]);*/

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de pacientes</Text>
            <Button title="Registrar paciente" />
            <TextInput

                placeholder="Buscar paciente..."
                /*value={searchTerm}
                onChangeText={setSearchTerm}*/
            />
            <ScrollView horizontal={true} style={{ marginTop: 20 }}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} style={styles.head} widthArr={[100, 200, 200, 100, 100, 100, 200]} />
                        {/*{filteredConsultations.length > 0 ? (
                            <Rows data={tableData} style={styles.rows} widthArr={[100, 200, 200, 100, 100, 100, 200]} />
                        ) : <Text style={{ margin: 15 }}>No hay pacientes registrados</Text>}*/}
                    </Table>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                /*onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    setSelectedConsultation(null);
                    setPatient('');
                    setDoctor('');
                    setSuffering('');
                    setDiagnosis('');
                    setPrescription('');
                    setWeight('');
                    setHeight('');
                    setTemperature('');
                    setPressure('');
                    setMass('');
                    setSaturation('');
                }}*/>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{selectedConsultation ? 'Editar consulta' : 'Nueva consulta'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Peso"
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estatura"
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Temperatura"
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Presión"
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Masa corporal"
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Saturación"
                            keyboardType='numeric'
                        />
                        <View style={styles.modalButtonsContainer}>
                            <Button title="Guardar" />
                            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    textHead: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    rows: {
        height: 150,
        backgroundColor: '#fff',
    },
    text: {
        margin: 6,
        textAlign: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    tableContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 10
    }
});