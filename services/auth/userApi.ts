import api from "../api"
import {storeKey} from "@/utils/utils"

// For User Access
export const userLogin = async ({phone}: User) => {
    const res = await api.post(`/auth/user/login`,{
        phone: phone,
    });
    storeKey("authToken", res.data.token)
    storeKey("role", res.data.data.user.role)
    return res.data;
};
export const userSignup = async ({name, phone}: User) => {
    const res = await api.post(`/auth/user/signup`, {
        name: name,
        phone: phone
    });
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
