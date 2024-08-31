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