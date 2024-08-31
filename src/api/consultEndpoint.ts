import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'consultas';

export const getCountConsult = async () => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/count`, {
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

export const getAllConsults = async () => {
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

export const getConsultsByPatient = async (paciente: string) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/paciente/${paciente}`, {
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

export const getConsultsByDate = async (fecha: string) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/fecha/${fecha}`, {
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

export const getConsultsByStatus = async (estatus: number) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/estatus/${estatus}`, {
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