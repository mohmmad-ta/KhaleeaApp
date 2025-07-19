import { create } from 'zustand';

export const useDataStore = create((set) => ({
    shopCard: [],
    setShopCard: (item: any) =>
        set((state:any) => ({
            shopCard: [...state.shopCard, item],
        })),
    updateShopCard: (index: number, count: number) =>
        set((state: any) => ({
            shopCard: state.shopCard.map((item: any, i: number) =>
                i === index ? { ...item, count } : item
            ),
        })),

    clearShopCard: () => set({ shopCard: [] }),
}));

export const useUserStore = create((set) => ({
    user: {},

    setUser: (item: any) =>
        set(() => ({
            user: item,
        })),

    updateUser: (updatedFields: any) =>
        set((state: any) => ({
            user: { ...state.user, ...updatedFields },
        })),

    clearUser: () =>
        set(() => ({
            user: {},
        })),
}));

export const useOrderStore = create((set) => ({
    orders: [],
    setOrders: (item: any) =>
        set((state:any) => ({
            orders: item,
        })),

    updateOrderById: (id: string, updatedData: any) =>
        set((state: any) => ({
            orders: state.orders.map((order: any) =>
                order._id === id ? { ...order, ...updatedData } : order
            ),
        })),

    clearOrder: () => set({ shopCard: [] }),
}));