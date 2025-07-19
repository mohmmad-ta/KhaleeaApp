import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api"

// For User Access
export const myAllOrders = async () => {
    const res = await api.get(`/order/user/myAllOrders`);
    return res.data;
};

export const createOrder = async (data: any) => {
    const res = await api.post('/order/user/', data);
    return res.data;
};

// For Restaurant Access

export const myRestAllOrders = async () => {
    const res = await api.get('/order/restaurant/myAllOrders');
    return res.data;
};

// For Delivery Access

// export const createOrder = async (data: { email: string; password: string }) => {
//     const res = await api.post('/order/delivery/', data);
//     return res.data;
// };