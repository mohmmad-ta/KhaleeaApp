import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api"
import {storeKey} from "@/utils/utils";

// For Delivery Access
export const deliveryLogin = async ({userID, password}: any) => {
    const res = await api.post(`/auth/delivery/login`, {
        userID: userID,
        password: password,
    });
    storeKey("authToken", res.data.token)
    storeKey("role", res.data.data.user.role)
    return res.data;
};
export const getMe = async () => {
    const res = await api.get(`/auth/delivery/getMe`);
    return res.data;
};
export const deleteMe = async () => {
    const res = await api.delete(`/auth/delivery/updateMe`);
    return res.data;
};