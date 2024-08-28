import { NuevoServicio } from "../models/Service";
import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'servicios';

export const getAllServices = async () => {
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

export const createService = async (servicio: NuevoServicio) => {
    try {
        const token = await getToken();
        const response = await api.post(`/${url}`, servicio, {
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

export const updateService = async (id: number, servicio: NuevoServicio) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/${id}`, servicio, {
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

export const deleteService = async (id: number) => {
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