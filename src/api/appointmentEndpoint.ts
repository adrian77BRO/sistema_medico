import { EditarCita, NuevaCita } from "../models/Appointment";
import { api } from "./endpoint";
import { getToken } from "../storage/token";

const url = 'citas';

export const getCountAppointment = async () => {
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

export const getAppointmentById = async (id: number) => {
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

export const getAllAppointments = async () => {
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

export const getAppointmentsByPatient = async (paciente: string) => {
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

export const getAppointmentsByStatus = async (estatus: number) => {
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

export const createAppointment = async (cita: NuevaCita) => {
    try {
        const token = await getToken();
        const response = await api.post(`/${url}`, cita, {
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

export const updateAppointment = async (id: number, cita: EditarCita) => {
    try {
        const token = await getToken();
        const response = await api.put(`/${url}/${id}`, cita, {
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

export const deleteAppointment = async (id: number) => {
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

export const cancelAppointment = async (id: number) => {
    try {
        const token = await getToken();
        const response = await api.delete(`/${url}/cancel/${id}`, {
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