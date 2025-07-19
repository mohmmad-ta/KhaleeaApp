import { Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {images} from "@/constants/images";
import {useState} from "react";
import { useRouter} from "expo-router";
import {deliveryLogin} from "@/services/auth/deliveryApi";


export default function LoginDeli() {
    const router = useRouter();

    const [user, setUser] = useState({
        userID: '',
        password: '',
    });

    const [alertOne, setAlertsOne] = useState<{ userID?: string; password?: string }>({});

    const handleSubmit = () => {
        if (!user.userID.trim()) {
            setAlertsOne((prev) => ({ ...prev, userID: 'Name is required' }))
        } else if (!user.password) {
            setAlertsOne((prev) => ({ ...prev, userID: '', password: 'Phone must be exactly 11 digits and start with 07' }))
        } else {
            deliveryLogin(user).then(() => {
                router.replace('/(delivery)/homeDeli');})
        }
    };
    return (
        <View className="px-14 w-full justify-center items-end min-h-screen bg-white py-20">
            <View className="w-full gap-2 items-center">
                <Image source={images.bg} className={"w-60 h-16 mb-12"} />

                <Text className="w-full text-right mt-2 text-secondary-950">userID</Text>
                <TextInput
                    className="w-full bg-secondary-50 border text-right p-2 border-gray-300 rounded-md"
                    placeholder="Enter user ID"
                    value={user.userID}
                    onChangeText={(text) =>
                        setUser((prev) => ({
                            ...prev,
                            userID: text,
                        }))
                    }
                />
                {alertOne.userID && <Text className="text-xs text-right text-red-500">{alertOne.userID}</Text>}

                <Text className="w-full text-right mt-2 text-secondary-950">password</Text>
                <TextInput
                    className="w-full bg-secondary-50 border text-right p-2 border-gray-300 rounded-md"
                    placeholder="Enter password"
                    value={user.password}
                    onChangeText={(text) =>
                        setUser((prev) => ({
                            ...prev,
                            password: text,
                        }))
                    }
                    keyboardType="visible-password"
                    maxLength={11}
                />
                {alertOne.password && <Text className="text-xs text-right text-red-500">{alertOne.password}</Text>}

                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 mt-8 w-[70%] rounded-md bg-main-50"
                >
                    <Text className="text-white font-bold w-full text-center">Custom Button</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}