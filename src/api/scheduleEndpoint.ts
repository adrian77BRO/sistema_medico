import { NuevoHorario } from "../models/Schedule";
import { api } from "./endpoint";
import { getToken } from "./token";

const url = 'horarios';

export const getAllSchedules = async () => {
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

export const createSchedule = async (horario: NuevoHorario) => {
    try {
        const token = await getToken();
        const response = await api.post(`/${url}`, horario, {
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

export const updateSchedule = async (id: number, horario: NuevoHorario) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/${id}`, horario, {
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

export const deleteSchedule = async (id: number) => {
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