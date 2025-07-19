import { Link } from "expo-router";
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
                    <View className="w-full min-h-96 px-6 pb-6 pt-1 justify-center items-center bg-white rounded-md">
                        <Text className="w-full text-right my-1 text-secondary-950">Product Name</Text>
                        <TextInput
                            placeholder="Enter name"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={product.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">Description</Text>
                        <TextInput
                            placeholder="Enter description"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={product.description}
                            onChangeText={(text) => handleChange('description', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">Price</Text>
                        <TextInput
                            placeholder="Enter price"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={product.price}
                            onChangeText={(text) => handleChange('price', text)}
                            keyboardType="numeric"
                        />
                        <View className="w-full mt-4 gap-2 flex-row items-center justify-center">
                            <TouchableOpacity
                                onPress={() => togDisplay()}
                                className="p-2 mt-4 w-[45%] rounded-md bg-secondary-500"
                            >
                                <Text className="text-white font-bold w-full text-center">close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => alert('Pressed!')}
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