import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'usuarios';

export const loginUser = async (correo: string, pass: string) => {
    try {
        const response = await api.post(`/${url}/login`, {
            correo,
            pass
        });
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
};

export const getProfile = async () => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/perfil`, {
            headers: {
                'Authorization': `${token}`,
            },
        });
        return response;
    } catch (error: any) {
        throw error.response?.data;
    }
}

export const updateProfile = async (profile: {
    id_municipio: number;
    correo: string;
    telefono: string;
    telefono_urgencias: string;
    direccion: string;
    whatsapp: string;
    facebook: string;
    twitter: string;
    instagram: string;
    web: string;
    sobre_mi: string;
    experiencia: string;
}) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/perfil`, profile, {
            headers: {
                'Authorization': `${token}`,
            },
        });
        return response;
    } catch (error: any) {
        throw error.response?.data;
    }
};