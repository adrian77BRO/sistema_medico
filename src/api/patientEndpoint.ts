import { NuevoPaciente } from "../models/Patient";
import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'pacientes';

export const getCountPatient = async () => {
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

export const getPatientById = async (id: number) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/${id}/info`, {
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

export const getAllPatients = async () => {
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

export const getPatientsByName = async (nombre: string) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${url}/nombre/${nombre}`, {
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

export const createPatient = async (paciente: NuevoPaciente) => {
    try {
        const token = await getToken();
        const response = await api.post(`/${url}`, paciente, {
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

export const updatePatient = async (id: number, paciente: NuevoPaciente) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/${id}`, paciente, {
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

export const deletePatient = async (id: number) => {
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