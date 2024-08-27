import AsyncStorage from '@react-native-async-storage/async-storage';

export const setIdUser = async (id: number) => {
    try {
        await AsyncStorage.setItem('user', id.toString());
    } catch (error) {
        console.error('Error al almacenar el id del usuario', error);
    }
};

export const getIdUser = async () => {
    try {
        return await AsyncStorage.getItem('user');
    } catch (error) {
        console.error('Error al obtener el id del usuario', error);
        return null;
    }
};