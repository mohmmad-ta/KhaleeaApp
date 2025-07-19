import {Text, Image, TouchableOpacity, View, TextInput, Button, Modal} from "react-native";
import { images } from "@/constants/images";
import {icons} from "@/constants/icons";
import {useState} from "react";
import {BlurView} from "expo-blur";
import {createDelivery} from "@/services/auth/RestaurantApi";

export default function DeliveryForm({togDisplay, display, addNewDelivery}:any)  {
    const [delivery, setDelivery] = useState({
        name: '',
        userID: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });
    const handleChange = (field: string, value: any) => {
        setDelivery({ ...delivery, [field]: value });
    };
    const handleSubmit = () => {
        createDelivery(delivery).then((res) => {
            addNewDelivery(res.data.user);})
        togDisplay()
    }
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
                    <View className="w-full min-h-96 px-6 pb-6 pt-1 justify-center items-center bg-white rounded-md">
                        <Text className="w-full text-center my-4 font-bold text-lg text-main-50">Add Delivery</Text>

                        <Text className="w-full text-right my-1 text-secondary-950">Product Name</Text>
                        <TextInput
                            placeholder="Enter name"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={delivery.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">userID</Text>
                        <TextInput
                            placeholder="Enter userID"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={delivery.userID}
                            onChangeText={(text) => handleChange('userID', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">password</Text>
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Enter password"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={delivery.password}
                            onChangeText={(text) => handleChange('password', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">passwordConfirm</Text>
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Enter passwordConfirm"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={delivery.passwordConfirm}
                            onChangeText={(text) => handleChange('passwordConfirm', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">phone</Text>
                        <TextInput
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={delivery.phone}
                            onChangeText={(text) => handleChange('phone', text)}
                            placeholder="Enter Phone (e.g. 07xxxxxxxxx)"
                            keyboardType="numeric"
                            maxLength={11}
                        />
                        <View className="w-full mt-4 gap-2 flex-row items-center justify-center">
                            <TouchableOpacity
                                onPress={() => togDisplay()}
                                className="p-2 mt-4 w-[45%] rounded-md bg-secondary-500"
                            >
                                <Text className="text-white font-bold w-full text-center">close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                className="p-2 mt-4 w-[45%] rounded-md bg-main-50"
                            >
                                <Text className="text-white font-bold w-full text-center">Custom Button</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    );
};