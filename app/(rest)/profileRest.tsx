import {Alert, Animated, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link, useNavigation, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";
import {getMe, getAllMyDelivery, deleteMeDelivery} from "@/services/auth/RestaurantApi";
import DeliveryForm from "@/components/DeliveryForm";
import RestaurantForm from "@/components/RestaurantForm";
import {useUserStore} from "@/store/useDataStore";
import {logout} from "@/utils/utils";

export default function Profile() {
    const { setUser, user } = useUserStore();
    const router = useRouter();
    const [delivert, setDelivert] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [showHeader, setShowHeader] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleProfile, setModalVisibleProfile] = useState(false);
    const display = ()=>{
        setModalVisible(false)
    }
    const displayProfile = ()=>{
        setModalVisibleProfile(false)
    }
    const addNewDelivery = (newItem: any) => {
        setDelivert(prev => [...prev, newItem]);
    };
    const logOut = async () => {
        await logout()
        router.replace('/login');
    }

    const deleteDelivery = (id:string, indexToRemove:number)=>{
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        await deleteMeDelivery(id)
                        setDelivert(prev => prev.filter((_, index) => index !== indexToRemove));
                    }
                },
            ],
            { cancelable: true }
        );
    }
    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            if (value > 100 && showHeader) {
                setShowHeader(false);
                navigation.setOptions({
                    headerShown: true,
                    headerTransparent: true,
                    headerBackground: () => (
                        <BlurView intensity={70} tint="light" style={{ flex: 1 }} />
                    ),
                    headerTitleStyle: {
                        color: colorsVar.primary,
                    },
                    headerTintColor: colorsVar.white,
                });
            } else if (value <= 100 && !showHeader) {
                setShowHeader(true);
                navigation.setOptions({ headerShown: false });
            }
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY, showHeader]);
    useEffect(() => {
        getMe().then((response) => {
            setUser(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setLoading(false);
            });
        getAllMyDelivery().then((response) => {
            setDelivert(response.data);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View className="bg-screen flex-1">
            <Animated.ScrollView
                className="flex-1 px-6 pt-20 relative"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{minHeight: "100%"}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >


                <View className="flex-row gap-2 items-center justify-end w-full">
                    <Text className="text-lg text-secondary-950 font-bold">
                        Latest Movies
                    </Text>
                    <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                </View>

                <View className="w-full p-5 mt-4 items-end rounded-md bg-white shadow-md shadow-primary-100">
                    <View className="flex-row justify-between w-full items-center">
                        <TouchableOpacity className=" bg-secondary-100 p-2 rounded-full" onPress={() => {setModalVisibleProfile(true)}}>
                            <Image source={icons.box} tintColor="#F15A29FF" className="size-6" />
                        </TouchableOpacity>
                        <View className="flex-row overflow-hidden items-center gap-2">
                            <View className="gap-1 items-end">
                                <Text className="text-lg text-primary-950 font-bold">{user.name}</Text>
                                <View className={"border border-main-100  px-2 rounded-full"}>
                                    <Text className="text-md">
                                        <Text className=" text-main-50 font-bold"> % </Text>
                                        <Text className=" text-secondary-950 font-bold">{user.discount}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View className="rounded-full border p-1 border-main-50">
                                <Image source={{uri: user.image}} className="w-14 h-14 rounded-full" />
                            </View>
                        </View>
                    </View>
                </View>

                <View className="flex-row my-4 gap-2 items-center justify-end w-full">
                    <Text className="text-lg text-secondary-950 font-bold">
                        Latest Movies
                    </Text>
                    <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                </View>

                <View className="w-full bg-white p-4 rounded-md shadow-md shadow-primary-100">
                    <FlatList
                        data={delivert}
                        renderItem={({item, index})=>
                            <View className={`${index+1 % 2 === 0 ? "bg-secondary-50" : "bg-none"} flex-row items-center justify-between py-3 rounded`}>
                                <TouchableOpacity className=" bg-secondary-50 p-2 rounded-full" onPress={()=>{deleteDelivery(item.id , index)}}>
                                    <Image source={icons.dele} tintColor="#E60023" className="size-6" />
                                </TouchableOpacity>
                                <Text className="text-secondary-950 text-md font-bold"> {item.name} <Text className="text-main-50"> {index+1} </Text></Text>
                            </View>
                        }
                        className="gap-1 w-full"
                        scrollEnabled={false}
                    />
                </View>
                <View className="w-full mb-10 items-center justify-center p-6">
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="p-2 w-[70%] rounded-md bg-secondary-500"
                    >
                        <Text className="text-white font-bold w-full text-center">Add Delivery</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={logOut}
                    className="p-2 mt-8 w-[70%] rounded-md bg-main-50"
                >
                    <Text className="text-white font-bold w-full text-center">Custom Button</Text>
                </TouchableOpacity>
                <DeliveryForm addNewDelivery={addNewDelivery} togDisplay={display} display={modalVisible} />
                <RestaurantForm togDisplay={displayProfile} display={modalVisibleProfile} />
            </Animated.ScrollView>
        </View>
    );
}
