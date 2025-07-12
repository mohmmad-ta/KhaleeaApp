import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

const API = axios.create({
    baseURL: 'http://localhost:7060/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token if needed
API.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authToken'); // import AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default API;