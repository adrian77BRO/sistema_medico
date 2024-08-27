import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error al almacenar el token', error);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Error al obtener el token', error);
        return null;
    }
};