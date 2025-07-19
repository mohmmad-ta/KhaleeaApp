import {Animated, Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";
import Carousel from "react-native-reanimated-carousel";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";
import {getMeal, getRestaurantMeals} from "@/services/meals/mealsApi";
import {useDataStore} from "@/store/useDataStore";

const MealDetails = () => {
    const {id} = useLocalSearchParams()
    const card = useDataStore((state:any) => state.shopCard);
    const setcard = useDataStore((state:any) => state.setShopCard);
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [itemCount, setItemCount] = useState(1);
    const [showHeader, setShowHeader] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const pushItem = () => {
        setcard({ item: data, count: itemCount })
    }

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            if (value > 200 && showHeader) {
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
                    headerTitle: "",
                });
            } else if (value <= 200 && !showHeader) {
                setShowHeader(true);
                navigation.setOptions({
                    headerShown: true,
                    headerTransparent: true,
                    headerBackground: () => (
                        <BlurView intensity={0} tint="light" style={{ flex: 1 }} />
                    ),
                    headerTitle: "",
                });
            }
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY, showHeader]);

    useEffect(() => {
        getMeal(id).then((response) => {
            setData(response.data);
            setLoading(false)
        })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View className="bg-screen flex-1 relative">
            <Animated.ScrollView
                className="flex-1 relative"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{minHeight: "100%"}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >


                <>
                    <View className="w-full h-[26rem] justify-end items-center relative">
                        <Image source={{uri: data.image}} resizeMode="cover" className="w-full absolute top-0 left-0 h-full" />
                        <Image source={images.bot} className="w-full absolute bottom-0 left-0 h-36" />
                    </View>
                    <View className="w-full justify-end mt-[-3rem] items-center relative">
                        <View className="h-36 overflow-hidden relative rounded-xl mb- justify-center w-[90%] items-center">
                            <BlurView intensity={50} tint="light" style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, }} />
                            <Text className="text-2xl mb-3 font-bold text-main-50">{data.name}</Text>
                            <Text className="text-md text-center text-secondary-950 mt-1">{data.description}</Text>
                        </View>
                    </View>
                </>

                <>
                    <View className="h-36 absolute w-full top-0 left-0">
                        <Image source={images.top} tintColor={colorsVar.secondary} className="w-full h-full absolute top-0 left-0" />
                    </View>
                </>
                <>
                    <View className="flex-row mt-10 gap-2 items-center justify-end px-6 w-full">
                        <Text className="text-lg text-secondary-950 font-bold">
                            Latest Movies
                        </Text>
                        <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                    </View>
                </>

            </Animated.ScrollView>
            <View className="absolute p-6 pt-3 pb-10 w-full h-36 bg-white bottom-0 left-0" >
                <View className="flex-row w-full justify-center mb-4 items-center gap-10">
                    <TouchableOpacity
                        onPress={() => {
                            if(itemCount>1) setItemCount(itemCount - 1)
                        }}
                        className="p-2"
                    >
                        <Image source={icons.remove} tintColor="#F15A29FF" className="size-6" />
                    </TouchableOpacity>
                    <Text className="text-lg text-secondary-950 font-bold">{itemCount}</Text>
                    <TouchableOpacity
                        onPress={() => setItemCount(itemCount + 1)}
                        className="p-2"
                    >
                        <Image source={icons.add} tintColor="#F15A29FF" className="size-6" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row w-full justify-center items-center gap-3">
                    <TouchableOpacity
                        onPress={() => pushItem()}
                        className="p-2 w-[70%] rounded-md bg-main-50"
                    >
                        <Text className="text-white font-bold w-full text-center">Custom Button</Text>
                    </TouchableOpacity>
                    <Text className="text-lg text-center w-[30%] font-bold gap-2">
                        <Text className="text-main-50"> $ </Text>
                        <Text className="text-secondary-950">{data.price * itemCount}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default MealDetails