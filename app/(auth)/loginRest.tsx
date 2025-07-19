import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import {icons} from "@/constants/icons";
import {restaurantLogin} from "@/services/auth/RestaurantApi"
import {images} from "@/constants/images";
import {useState} from "react";
import {Link, useRouter} from "expo-router";
import {validatePhone} from "@/utils/utils"


export default function LoginRest() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        phone: '',
    });

    const [alertOne, setAlertsOne] = useState<{ phone?: string; name?: string }>({});

    const handleSubmit = () => {
        if (!validatePhone(user.phone)) {
            setAlertsOne((prev) => ({ ...prev, name: '', phone: 'Phone must be exactly 11 digits and start with 07' }))
        } else {
            restaurantLogin(user).then((res) => {console.log(res.data)})
            router.replace('/(rest)/homeRest');
        }
    };
    return (
        <View className="px-14 w-full justify-center items-end min-h-screen bg-white py-20">
            <View className="w-full gap-2 items-center">
                <Text>login</Text>
                <Image source={images.bg} className={"w-60 h-16 mb-12"} />

                <Text className="w-full text-right mt-2 text-secondary-950">Description</Text>
                <TextInput
                    className="w-full bg-secondary-50 border text-right p-2 border-gray-300 rounded-md"
                    placeholder="Enter Phone (e.g. 07xxxxxxxxx)"
                    value={user.phone}
                    onChangeText={(text) =>
                        setUser((prev) => ({
                            ...prev,
                            phone: text.replace(/[^0-9]/g, ''),
                        }))
                    }
                    keyboardType="numeric"
                    maxLength={11}
                />
                {alertOne.phone && <Text className="text-xs text-right text-red-500">{alertOne.phone}</Text>}

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