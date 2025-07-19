import { Link, useRouter } from "expo-router";
import {Text, Image, TouchableOpacity, View, TextInput, Button, Modal} from "react-native";
import { images } from "@/constants/images";
import {icons} from "@/constants/icons";
import {useState} from "react";
import {BlurView} from "expo-blur";

export default function MealCard({togDisplay, display}:any)  {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
    });
    const router = useRouter();
    const handleChange = (field: string, value: any) => {
        setProduct({ ...product, [field]: value });
    };
    const handleSubmit = () => {}
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={display}
            onRequestClose={() => togDisplay()}
        >
            <View className={`w-full min-h-screen justify-center`} >
                <BlurView intensity={50} tint="dark" style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, }} />
                <View className="px-6 w-full py-20">
                    <View className="w-full gap-2 min-h-96 px-6 py-10 pt-1 justify-center items-center bg-white rounded-md">

                        <Text className="text-sm w-full mt-2 text-primary-950 text-right">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dignissimos doloribus id quia sed?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                togDisplay()
                                router.push('/(auth)/loginRest');
                            }}
                            className="p-3 w-full rounded-md bg-screens-50"
                        >
                            <Text className="text-secondary-950 w-full text-right">login Restaurant</Text>
                        </TouchableOpacity>

                        <Text className="text-sm w-full mt-2 text-primary-950 text-right">Lorem ipsum dolor sit amet</Text>
                        <TouchableOpacity
                            onPress={() => {
                                togDisplay()
                                router.push('/(auth)/loginDeli');
                            }}
                            className="p-3 w-full rounded-md bg-secondary-50"
                        >
                            <Text className="text-secondary-950 w-full text-right">login Delivery</Text>
                        </TouchableOpacity>

                        <View className="w-full mt-4 gap-2 flex-row items-center justify-center">
                            <TouchableOpacity
                                onPress={() => togDisplay()}
                                className="p-2 w-[45%] rounded-md bg-secondary-500"
                            >
                                <Text className="text-white font-bold w-full text-center">close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => alert('Pressed!')}
                                className="p-2 w-[45%] rounded-md bg-main-50"
                            >
                                <Text className="text-white font-bold w-full text-center">ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    );
};