import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api"

export const getAllRestaurant = async () => {
    const res = await api.get(`/meal/?sort=-discount`);
    return res.data;
};
export const getSearch = async (search: string) => {
    const res = await api.get(`/meal/search?search=${search}`);
    return res.data;
};
export const getTopRestaurant = async () => {
    const res = await api.get(`/meal/?limit=5&sort=-ratingsAverage`);
    return res.data;
};
export const getRestaurantMeals = async (id: any) => {
    const res = await api.get(`/meal/${id}`);
    return res.data;
};
export const getMeal = async (id: any) => {
    const res = await api.get(`/meal/getMeal/${id}`);
    return res.data;
};

// Only Restaurant Can Access
export const getMyAllMeals = async () => {
    const res = await api.get(`/meal/restaurant/MyMeals`);
    return res.data;
};
export const createNewMeal = async (meal: Meal) => {
    const res = await api.post(`/meal/restaurant/createMeal`, meal);
    return res.data;
};
export const deleteMeal = async (id: string) => {
    const res = await api.post(`/meal/restaurant/deleteMeal/${id}`);
    return res.data;
};
export const updateMeal = async (id: string, meal: Meal) => {
    const res = await api.patch(`/meal/restaurant/updateMeal/${id}`, meal);
    return res.data;
};