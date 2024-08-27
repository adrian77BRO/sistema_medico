import { api } from "./endpoint";
import { getToken } from "./token";

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