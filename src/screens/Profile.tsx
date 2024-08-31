import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { NuevoPerfil } from '../models/User';
import { getProfile, updateProfile } from '../api/userEndpoint';
import { AttentionModal } from '../components/AttentionModal';
import { ServicesModal } from '../components/ServicesModal';
import { SchedulesModal } from '../components/SchedulesModal';

type ConsultFormScreenProps = NativeStackScreenProps<StackParamList, 'Mi perfil'>;

export const ProfileScreen: React.FC<ConsultFormScreenProps> = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [cedula, setCedula] = useState('');
    const [cedula_especialidad, setCedula_especialidad] = useState('');
    const [cedula_subespecialidad, setCedula_subespecialidad] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [telefono_urgencias, setTelefono_urgencias] = useState('');
    const [direccion, setDireccion] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [web, setWeb] = useState('');
    const [sobre_mi, setSobre_mi] = useState('');
    const [experiencia, setExperiencia] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const [modalAttention, setModalAttention] = useState(false);
    const [modalServices, setModalServices] = useState(false);
    const [modalSchedules, setModalSchedules] = useState(false);

    useEffect(() => {
        getProfileUser();
    }, []);

    const getProfileUser = async () => {
        const response = await getProfile();
        const perfil = response.data.perfil;
        setNombre(perfil.nombre);
        setApellidos(perfil.apellidos);
        setEstado(perfil.estado);
        setMunicipio(perfil.municipio);
        setCorreo(perfil.correo);
        setTelefono(perfil.telefono);
        setCedula(perfil.cedula);
        setCedula_especialidad(perfil.cedula_especialidad);
        setCedula_subespecialidad(perfil.cedula_subespecialidad);
        setEspecialidad(perfil.especialidad);
        setTelefono_urgencias(perfil.telefono_urgencias);
        setDireccion(perfil.direccion);
        setWhatsapp(perfil.whatsapp);
        setFacebook(perfil.facebook);
        setTwitter(perfil.twitter);
        setInstagram(perfil.instagram);
        setWeb(perfil.web);
        setSobre_mi(perfil.sobre_mi);
        setExperiencia(perfil.experiencia);
    }

    const handleViewAttention = () => {
        setModalAttention(true);
    };

    const handleViewServices = () => {
        setModalServices(true);
    };

    const handleViewSchedules = () => {
        setModalSchedules(true);
    };

    const handlePhoneNumberChange = (input: string) => {
        const formattedInput = input.replace(/[^0-9]/g, '');

        if (formattedInput.length <= 10) {
            setTelefono(formattedInput);
        }
    };

    const handleUrgencyNumberChange = (input: string) => {
        const formattedInput = input.replace(/[^0-9]/g, '');

        if (formattedInput.length <= 10) {
            setTelefono_urgencias(formattedInput);
        }
    };

    const handleWhatsappNumberChange = (input: string) => {
        const formattedInput = input.replace(/[^0-9]/g, '');

        if (formattedInput.length <= 10) {
            setWhatsapp(formattedInput);
        }
    };

    const handleSave = async () => {
        try {
            const profileData: NuevoPerfil = {
                correo, telefono, telefono_urgencias, direccion, whatsapp,
                facebook, twitter, instagram, web, sobre_mi, experiencia
            };
            const response = await updateProfile(profileData);
            Alert.alert(response.data.message, 'Perfil actualizado');
        } catch (error: any) {
            Alert.alert('Error', error.message);
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} editable={false} />
                    <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} editable={false} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
                    <TextInput style={styles.input} placeholder="Teléfono" keyboardType="numeric" maxLength={10}
                        value={telefono} onChangeText={handlePhoneNumberChange} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Estado" value={estado} editable={false} />
                    <TextInput style={styles.input} placeholder="Municipio" value={municipio} editable={false} />
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
                    <TextInput style={styles.input} placeholder="Médico" value={cedula} editable={false} />
                    <TextInput style={styles.input} placeholder="Especialidad" value={cedula_especialidad} editable={false} />
                    <TextInput style={styles.input} placeholder="Subespecialidad" value={cedula_subespecialidad} editable={false} />
                </View>
                <TextInput style={styles.input} placeholder="Especialidad" value={especialidad} editable={false} />
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Teléfono de urgencia" keyboardType="numeric" maxLength={10}
                        value={telefono_urgencias} onChangeText={handleUrgencyNumberChange} />
                    <TextInput style={styles.input} placeholder="Whatsapp" keyboardType="numeric" maxLength={10}
                        value={whatsapp} onChangeText={handleWhatsappNumberChange} />
                </View>
                <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Facebook" value={facebook} onChangeText={setFacebook} />
                    <TextInput style={styles.input} placeholder="Twitter" value={twitter} onChangeText={setTwitter} />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Instagram" value={instagram} onChangeText={setInstagram} />
                    <TextInput style={styles.input} placeholder="Enlace web" value={web} onChangeText={setWeb} />
                </View>
                <TextInput style={[styles.input, styles.bigText]} placeholder="Sobre mí" multiline={true}
                    numberOfLines={4} value={sobre_mi} onChangeText={setSobre_mi} />
                <TextInput style={[styles.input, styles.bigText]} placeholder="Experiencia" multiline={true}
                    numberOfLines={4} value={experiencia} onChangeText={setExperiencia} />

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
                doctor={nombre + ' ' + apellidos}
            />
            <ServicesModal
                visible={modalServices}
                onClose={() => setModalServices(false)}
                doctor={nombre + ' ' + apellidos}
            />
            <SchedulesModal
                visible={modalSchedules}
                onClose={() => setModalSchedules(false)}
                doctor={nombre + ' ' + apellidos}
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