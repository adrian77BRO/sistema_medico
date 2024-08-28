import { NuevaAtencion } from "../models/Attention";
import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'atencion';

export const getAllAttentions = async () => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}`, {
            headers: {
                'Authorization': `${token}`,
            },
        });
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}

export const createAttention = async (atencion: NuevaAtencion) => {
    try {
        const token = await getToken();
        const response = await api.post(`/${url}`, atencion, {
            headers: {
                'Authorization': `${token}`,
            },
        });
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}

export const updateAttention = async (id: number, atencion: NuevaAtencion) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/${id}`, atencion, {
            headers: {
                'Authorization': `${token}`,
            },
        });
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}

export const deleteAttention = async (id: number) => {
    try {
        const token = await getToken();
        const response = await api.delete(`/${url}/${id}`, {
            headers: {
                'Authorization': `${token}`,
            },
        });
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}