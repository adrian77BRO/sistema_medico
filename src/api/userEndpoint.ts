import { api } from "./endpoint";
import { getToken } from "../storage/token";
import { NuevoPerfil } from "../models/User";

const url = 'usuarios';

export const loginUser = async (usuario: string, pass: string) => {
    try {
        const response = await api.post(`/${url}/login`, {
            usuario,
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

export const updateProfile = async (profile: NuevoPerfil) => {
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