import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";


export const validatePhone = (phone: string) => {
    const phoneRegex = /^07\d{9}$/; // starts with 07 and has total 7 digits
    return phoneRegex.test(phone);
};

export const storeKey = (key: string ,token: string) => {
    AsyncStorage.setItem(key, token).catch(console.error);
};

export const getKey = (key :string) => {
    AsyncStorage.getItem(key).then(data => {return data})
};

export const removeKey = () => {
    AsyncStorage.removeItem('userToken').catch(console.error);
};

export const logout = async () => {
    const res = await api.get(`/auth/logout`);
    storeKey("userToken", '')
    storeKey("role", '')
    return res.data;
};