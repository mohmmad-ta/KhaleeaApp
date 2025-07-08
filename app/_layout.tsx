import { Stack } from "expo-router";
import "./global.css"
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar"
import {useState} from "react";

export default function RootLayout() {
    const [role, setRole] = useState<null | 'admin' | 'user' | 'auth'>('auth');
    if (role === 'auth') {
        return <Stack>
            <Stack.Screen
                name="(auth)"
                options={{ headerShown: false }}
            />
        </Stack>;
    }
    if (role === 'admin') {
        return <Stack>
            <Stack.Screen
                name="(rest)"
                options={{ headerShown: false }}
            />
        </Stack>;
    }
    if (role === 'user') {
        return <Stack >
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="meal/[id]"
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerBackground: () => (
                        <BlurView intensity={0} tint="light" style={{ flex: 1 }} />
                    ),
                    headerTitle: "",
                    headerTitleStyle: {
                        color: colorsVar.primary,
                    },
                    headerBackTitleStyle: {
                        fontSize: 1,
                    },
                    headerTintColor: colorsVar.secondary,
                }}
            />
            <Stack.Screen
                name="restaurant/[id]"
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerBackground: () => (
                        <BlurView intensity={0} tint="light" style={{ flex: 1 }} />
                    ),
                    headerTitle: "",
                    headerTitleStyle: {
                        color: colorsVar.primary,
                    },
                    headerBackTitleStyle: {
                        fontSize: 1,
                    },
                    headerTintColor: colorsVar.secondary,
                }}
            />
            <Stack.Screen
                name="oldOrders"
                options={{
                    title: "Old Order",
                    headerShown: true,
                    headerTransparent: true,
                    headerBackground: () => (
                        <BlurView intensity={80} tint="light" style={{ flex: 1 }} />
                    ),
                    headerBackTitleStyle: {
                        fontSize: 1,
                    },
                    headerTintColor: colorsVar.secondary,
                }}
            />
        </Stack>
    }
}
