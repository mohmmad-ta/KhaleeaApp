import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {useState} from "react";


export default function Login() {
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
        <View className="px-14 w-full justify-center items-end min-h-screen bg-white py-20">
            <View className="w-full gap-2 items-center">
                <Image source={images.bg} className={"w-60 h-16 mb-12"} />
                <Text className="w-full text-right  text-secondary-950">Product Name</Text>
                <TextInput
                    placeholder="Enter name"
                    className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                    value={product.name}
                    onChangeText={(text) => handleChange('name', text)}
                />

                <Text className="w-full text-right text-secondary-950">Description</Text>
                <TextInput
                    placeholder="Enter description"
                    className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                    value={product.description}
                    onChangeText={(text) => handleChange('description', text)}
                />

                <Text className="w-full text-right text-secondary-950">Price</Text>
                <TextInput
                    placeholder="Enter price"
                    className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                    value={product.price}
                    onChangeText={(text) => handleChange('price', text)}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    onPress={() => alert('Pressed!')}
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