import { NuevoHistorial } from "../models/History";
import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'historial';

export const getHistoryById = async (id: number) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/${id}`, {
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

export const getAllBloods = async () => {
    try {
        const response = await api.get(`/${url}/tiposangre`);
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}

export const createHistory = async (historial: NuevoHistorial) => {
    try {
        const token = await getToken();
        const response = await api.post(`/${url}`, historial, {
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

export const updateHistory = async (id: number, historial: NuevoHistorial) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/${id}`, historial, {
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