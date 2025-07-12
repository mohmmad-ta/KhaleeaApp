import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api"
import {storeKey} from "@/utils/utils";

// For Restaurant Access
export const restaurantLogin = async ({phone}: Restaurant) => {
    const res = await api.post(`/auth/restaurant/login`,{
        phone: phone,
    });
    storeKey("userToken", res.data.token)
    storeKey("role", res.data.data.user.role)
    return res.data;
};
export const restaurantSignup = async ({name, phone}: Restaurant) => {
    const res = await api.post(`/auth/restaurant/signup`, {
        name: name,
        phone: phone,
    });
    return res.data;
};
export const getMe = async () => {
    const res = await api.get(`/auth/restaurant/getMe`);
    return res.data;
};
export const deleteMe = async () => {
    const res = await api.delete(`/auth/restaurant/updateMe`);
    return res.data;
};
export const updateMe = async () => {
    const res = await api.patch(`/auth/restaurant/deleteMe`);
    return res.data;
};
export const createDelivery = async () => {
    const res = await api.post(`/auth/restaurant/createDelivery`);
    return res.data;
};
export const deleteMeDelivery = async () => {
    const res = await api.patch(`/auth/restaurant/deleteMeDelivery`);
    return res.data;
};