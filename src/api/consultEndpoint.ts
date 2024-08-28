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