import { Text, View } from "react-native";
import {Link, Redirect} from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const [role, setRole] = useState<null | 'admin' | 'user' | 'delivery' | 'restaurant'>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadRole = async () => {
            try {
                const storedRole = await AsyncStorage.getItem('role');
                console.log(storedRole);
                if (
                    storedRole === 'admin' ||
                    storedRole === 'user' ||
                    storedRole === 'delivery' ||
                    storedRole === 'restaurant'
                ) {
                    setRole(storedRole);
                } else {
                    setRole(null);
                }
            } catch (e) {
                console.error('Failed to load role:', e);
            } finally {
                setLoading(false); // <--- Mark as done loading
            }
        };

        loadRole();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-lg font-medium text-gray-500">Loading...</Text>
            </View>
        );
    }

    if (role === null || role === undefined) {
        return <Redirect href="/login" />;
    }
    if (role === 'user') {
        return <Redirect href="/(tabs)/home" />;
    }
    if (role === 'delivery') {
        return <Redirect href="/(delivery)/homeDeli" />;
    }
    if (role === 'admin') {
        return <Redirect href="/login" />;
    }
    if (role === 'restaurant') {
        return <Redirect href="/(rest)/homeRest" />;
    }
  return (
      <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-bold text-blue-500"></Text>
      </View>
  );
}
