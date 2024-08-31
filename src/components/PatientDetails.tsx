import React, { useState } from 'react';
import { View, Text, Modal, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { Paciente } from '../models/Patient';
import { Historial } from '../models/History';

interface PatientDetailsProps {
    paciente: Paciente;
    historial: Historial | null;
    visible: boolean;
    onClose: () => void;
}

export const PatientDetailsModal: React.FC<PatientDetailsProps> = ({ paciente, historial, visible, onClose }) => {
    const [activeSections, setActiveSections] = useState<number[]>([]);

    const formatDateISO = (dateISO: string) => {
        const date = new Date(dateISO);

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const sections = [
        {
            title: 'Información general',
            content: (
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>NOMBRE: {paciente.nombre} {paciente.apellidos}</Text>
                    <Text style={styles.text}>EMAIL: {paciente.correo}</Text>
                    <Text style={styles.text}>FECHA DE NACIMIENTO: {formatDateISO(paciente.fecha_nacimiento)}</Text>
                    <Text style={styles.text}>TELÉFONO: {paciente.telefono}</Text>
                    <Text style={styles.text}>SEXO:
                        {paciente.sexo == 1 && ' Hombre'}
                        {paciente.sexo == 2 && ' Mujer'}
                    </Text>
                </View>
            ),
        },
        {
            title: 'Historial clínico',
            content: (
                <View style={styles.infoContainer}>
                    {historial ? (
                        <>
                            <Text style={styles.text}>Tipo de sangre: {historial.tipo_sangre}</Text>
                            <Text style={styles.text}>Intervención quirúrgica:
                                {historial.intervencion_quirurgica == 1 && ' SÍ'}
                                {historial.intervencion_quirurgica == 0 && ' NO'}
                            </Text>
                            <Text style={styles.text}>Transfusión sanguínea:
                                {historial.transfucion_sanguinea == 1 && ' SÍ'}
                                {historial.transfucion_sanguinea == 0 && ' NO'}
                            </Text>
                            <Text style={styles.text}>Donación sanguínea:
                                {historial.donacion_sanguinea == 1 && ' SÍ'}
                                {historial.donacion_sanguinea == 0 && ' NO'}
                            </Text>
                            <TextInput style={styles.bigText} placeholder='Antecedentes heredofamiliares'
                                value={historial?.antecedentes_heredofamiliares} multiline={true}
                                numberOfLines={4} editable={false} />
                            <View style={styles.row}>
                                <TextInput style={styles.bigText} value={historial.alergias}
                                    placeholder='Alergias'
                                    multiline={true} numberOfLines={4} editable={false} />
                                <TextInput style={styles.bigText} value={historial.patologias}
                                    placeholder='Patologías'
                                    multiline={true} numberOfLines={4} editable={false} />
                            </View>
                            <TextInput style={styles.bigText} value={historial.observaciones}
                                placeholder='Observaciones'
                                multiline={true} numberOfLines={4} editable={false} />
                        </>
                    ) : <Text style={{ textAlign: 'center' }}>{'Paciente sin historial clínico'.toUpperCase()}</Text>}
                </View>
            ),
        }
    ];

    const renderHeader = (section: any, _: any, isActive: boolean) => (
        <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
            <Text style={styles.headerText}>{section.title}</Text>
        </View>
    );

    const renderContent = (section: any) => (
        <View style={styles.content}>
            {section.content}
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <ScrollView style={{ marginTop: 20 }}>
                    <Text style={styles.modalTitle}>Información del paciente:</Text>
                    <Text style={styles.modalName}>{paciente.nombre} {paciente.apellidos}</Text>
                    <Accordion
                        sections={sections}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={setActiveSections}
                    />
                    <TouchableOpacity style={styles.button} onPress={onClose}>
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
        padding: 20,
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    header: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    infoContainer: {
        backgroundColor: '#acffee',
        padding: 10,
        borderRadius: 10
    },
    active: {
        backgroundColor: '#34dbb8',
    },
    inactive: {
        backgroundColor: '#acffee',
    },
    button: {
        backgroundColor: 'red',
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
        flex: 2,
        borderWidth: 1,
        borderColor: '#34dbb8',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 80,
        textAlignVertical: 'top',
    },
});