import {Text, Image, TouchableOpacity, View, TextInput, Button, Modal, Alert} from "react-native";
import { images } from "@/constants/images";
import {icons} from "@/constants/icons";
import {useState} from "react";
import {BlurView} from "expo-blur";
import { updateMe} from "@/services/auth/RestaurantApi";
import * as ImagePicker from 'expo-image-picker';
import {useUserStore} from "@/store/useDataStore";

export default function RestaurantForm({togDisplay, display}:any)  {
    const { setUser, user } = useUserStore();
    const [restaurant, setRestaurant] = useState({
        name: user.name ,
        discount: user.discount
    });
    const [image, setImage] = useState<any>(null);
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'You need to allow media access');
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const permissionGranted = await requestPermission();
        if (!permissionGranted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // store the selected image
        }
    };

    const handleChange = (field: string, value: any) => {
        setRestaurant({ ...restaurant, [field]: value });
    };
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'product.jpg',
        } as any);
        formData.append('name', restaurant.name);

        updateMe(formData).then((res) => {
            setUser(res.data.user)})
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
                            value={restaurant.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">discount</Text>
                        <TextInput
                            placeholder="Enter discount"
                            className="w-full bg-secondary-50 mb-2 border text-right p-2 border-gray-300 rounded-md"
                            value={restaurant.discount}
                            onChangeText={(text) => handleChange('discount', text)}
                            keyboardType="numeric"
                        />

                        <Text className="w-full text-right my-1 text-secondary-950">image</Text>
                        <TouchableOpacity
                            onPress={pickImage}
                            className="p-2 mt-4 overflow-hidden rounded-md relative bg-secondary-100"
                        >
                            {image && (
                                <Image
                                    source={{ uri: image.uri }}
                                    style={{ width: 150, height: 100 }}
                                    className="rounded-md"

                                />
                            )}
                            <Text className={`${image ? "hidden" :"block"}`}>UP LODE</Text>
                        </TouchableOpacity>


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