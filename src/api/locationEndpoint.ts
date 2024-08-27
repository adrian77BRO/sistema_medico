import { api } from "./endpoint";

const url = 'ubicacion';

export const getAllStates = async () => {
    try {
        const response = await api.get(`/${url}`);
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}

export const getTownsByState = async (id: number) => {
    try {
        const response = await api.get(`/${url}/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.response);
        throw error.response?.data;
    }
}