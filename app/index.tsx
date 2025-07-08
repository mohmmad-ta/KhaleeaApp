import { Text, View } from "react-native";
import {Link, Redirect} from "expo-router";
import {useState} from "react";

export default function Profile() {
    const [role, setRole] = useState<null | 'admin' | 'user' | 'delivery' | 'restaurant'>(null);
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
