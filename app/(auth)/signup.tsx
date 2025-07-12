import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import {icons} from "@/constants/icons";
import {userSignup} from "@/services/auth/userApi"
import {images} from "@/constants/images";
import {useState} from "react";
import {validatePhone} from "@/utils/utils"



export default function Signup() {
    const [user, setUser] = useState({name: '', phone: '',});
    const [alertOne, setAlertsOne] = useState<{ phone?: string; name?: string }>({});

    const handleSubmit = () => {
        if (!user.name.trim()) {
            setAlertsOne((prev) => ({ ...prev, name: 'Name is required' }))
        } else if (!validatePhone(user.phone)) {
            setAlertsOne((prev) => ({ ...prev, name: '', phone: 'Phone must be exactly 11 digits and start with 07' }))
        } else {
            userSignup(user).then((data) => {
                console.log(data);})
        }
    };
    return (
        <View className="px-14 w-full justify-center items-end min-h-screen bg-white py-20">
            <View className="w-full gap-2 items-center">
                <Image source={images.bg} className={"w-60 h-16 mb-12"} />
                <Text className="w-full text-right mt-2 text-secondary-950">Product Name</Text>
                <TextInput
                    placeholder="Enter Name"
                    className="w-full bg-secondary-50 border text-right p-2 border-gray-300 rounded-md"
                    value={user.name}
                    onChangeText={(text) =>
                        setUser((prev) => ({ ...prev, name: text }))
                    }
                />
                {alertOne.name && <Text className="text-xs text-right text-red-500">{alertOne.name}</Text>}


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
                <TouchableOpacity
                    onPress={() => alert('Pressed!')}
                    className="p-2 w-full mt-8"
                >
                    <Text className="text-primary-950 w-full text-right">I dont have an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}