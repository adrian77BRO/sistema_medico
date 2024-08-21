import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

import { StackParamList } from '../types';
import { AttentionModal } from '../components/AttentionModal'
import { ServicesModal } from '../components/ServicesModal';
import { SchedulesModal } from '../components/SchedulesModal';

type ConsultFormScreenProps = NativeStackScreenProps<StackParamList, 'Mi perfil'>;

export const ProfileScreen: React.FC<ConsultFormScreenProps> = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');
    const [town, setTown] = useState('');
    const [doctorID, setDoctorID] = useState('');
    const [specialtyID, setSpecialtyID] = useState('');
    const [subspecialtyID, setSubspecialtyID] = useState('');
    const [urgencyPhone, setUrgencyPhone] = useState('');
    const [address, setAdress] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [web, setWeb] = useState('');
    const [aboutme, setAboutme] = useState('');
    const [experience, setExperience] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [modalAttention, setModalAttention] = useState(false);
    const [modalServices, setModalServices] = useState(false);
    const [modalSchedules, setModalSchedules] = useState(false);

    const states = ['Chiapas', 'Oaxaca', 'Tabasco'];
    const towns = ['Comitán', 'Copainalá', 'Reforma', 'Tapachula', 'Tecpatán', 'Tuxtla Gutiérrez']

    const handleViewAttention = () => {
        setModalAttention(true);
    };

    const handleViewServices = () => {
        setModalServices(true);
    };

    const handleViewSchedules = () => {
        setModalSchedules(true);
    };

    const handleSave = () => {
        console.log('Hola');
    };

    const handlePhoneNumberChange = (input: string) => {
        const formattedInput = input.replace(/[^0-9]/g, '');

        if (formattedInput.length <= 10) {
            setPhone(formattedInput);
            setUrgencyPhone(formattedInput);
            setWhatsapp(formattedInput);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Apellidos" value={lastName} onChangeText={setLastName} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Teléfono" keyboardType="numeric" maxLength={10}
                        value={phone} onChangeText={handlePhoneNumberChange} />
                </View>
                <View style={styles.row}>
                    <View style={styles.pickerContainer}>
                        <Picker style={styles.picker} selectedValue={state} onValueChange={(itemValue) => setState(itemValue)}>
                            <Picker.Item label="Estado" value="" />
                            {states.map((state, index) => (
                                <Picker.Item key={index} label={state} value={state} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker style={styles.picker} selectedValue={town} onValueChange={(itemValue) => setTown(itemValue)}>
                            <Picker.Item label="Municipio" value="" />
                            {towns.map((town, index) => (
                                <Picker.Item key={index} label={town} value={town} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <Text style={styles.title}>Datos del médico</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleViewAttention}>
                        <Text style={styles.buttonText}>Atención médica</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleViewServices}>
                        <Text style={styles.buttonText}>Servicios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={handleViewSchedules}>
                        <Text style={styles.buttonText}>Horarios</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ marginTop: 20, fontSize: 15 }}>Cédula</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Médico" value={doctorID} onChangeText={setDoctorID} editable={false} />
                    <TextInput style={styles.input} placeholder="Especialidad" value={specialtyID}
                        onChangeText={setSpecialtyID} editable={false} />
                    <TextInput style={styles.input} placeholder="Subespecialidad" value={subspecialtyID}
                        onChangeText={setSubspecialtyID} editable={false} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Teléfono de urgencia" keyboardType="numeric" maxLength={10}
                        value={urgencyPhone} onChangeText={handlePhoneNumberChange} />
                    <TextInput style={styles.input} placeholder="Whatsapp" keyboardType="numeric" maxLength={10}
                        value={whatsapp} onChangeText={handlePhoneNumberChange} />
                </View>
                <TextInput style={styles.input} placeholder="Dirección" value={address} onChangeText={setAdress} />
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Facebook" value={facebook} onChangeText={setFacebook} />
                    <TextInput style={styles.input} placeholder="Twitter" value={twitter} onChangeText={setTwitter} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Instagram" value={instagram} onChangeText={setInstagram} />
                    <TextInput style={styles.input} placeholder="Enlace web" value={web} onChangeText={setWeb} />
                </View>
                <TextInput style={[styles.input, styles.bigText]} placeholder="Sobre mí" multiline={true}
                    numberOfLines={4} value={aboutme} onChangeText={setAboutme} />
                <TextInput style={[styles.input, styles.bigText]} placeholder="Experiencia" multiline={true}
                    numberOfLines={4} value={experience} onChangeText={setExperience} />

                <Text style={styles.title}>Datos de acceso</Text>
                <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Contraseña" value={password}
                        onChangeText={setPassword} secureTextEntry />
                    <TextInput style={styles.input} placeholder="Repetir contraseña" value={repeatedPassword}
                        onChangeText={setRepeatedPassword} secureTextEntry />
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleSave}>
                    <Text style={styles.buttonText}>{'Actualizar'.toUpperCase()}</Text>
                </TouchableOpacity>
            </ScrollView>

            <AttentionModal
                visible={modalAttention}
                onClose={() => setModalAttention(false)}
            />
            <ServicesModal
                visible={modalServices}
                onClose={() => setModalServices(false)}
            />
            <SchedulesModal
                visible={modalSchedules}
                onClose={() => setModalSchedules(false)}
            />
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
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10
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
    row: {
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
    button: {
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
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
    buttons: {
        flex: 1,
        justifyContent: 'center',
    },
});