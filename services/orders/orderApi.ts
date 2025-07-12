import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api"

export const getUser = async (id: string) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

// Register or login user
export const postUser = async (data: { email: string; password: string }) => {
    const res = await api.post('/users/login', data); // or /register
    return res.data;
};