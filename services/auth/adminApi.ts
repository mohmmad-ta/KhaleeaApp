import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api"
import {storeKey} from "@/utils/utils";

// For User Access
export const userLogin = async () => {
    const res = await api.get(`/auth/user/signup`);
    storeKey("authToken", res.data.token)
    storeKey("role", res.data.data.user.role)
    return res.data;
};
export const userSignup = async () => {
    const res = await api.get(`/auth/user/login`);
    return res.data;
};
export const getMe = async () => {
    const res = await api.get(`/auth/user/me`);
    return res.data;
};
export const deleteMe = async () => {
    const res = await api.delete(`/auth/user/updateMe`);
    return res.data;
};
export const updateMe = async () => {
    const res = await api.patch(`/auth/user/deleteMe`);
    return res.data;
};