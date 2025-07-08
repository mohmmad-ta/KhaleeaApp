import {Animated, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link, useNavigation, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";

export default function Profile() {
    const router = useRouter();
    const data = [
        { title: 'lorem test 1', url: require('@/assets/images/p1.jpg') },
        { title: 'lorem test 2', url: require('@/assets/images/p2.jpg') },
        { title: 'lorem test 3', url: require('@/assets/images/p3.jpg') },
        { title: 'lorem test 4', url: require('@/assets/images/p4.jpg') },
        { title: 'lorem test 5', url: require('@/assets/images/p5.jpg') },
    ];
    const mealData = [
        { id: 1, url: require('@/assets/images/p1.jpg') },
        { id: 2, url: require('@/assets/images/p2.jpg') },
        { id: 3, url: require('@/assets/images/p3.jpg') },
        { id: 4, url: require('@/assets/images/p4.jpg') },
        { id: 5, url: require('@/assets/images/p5.jpg') },
    ];

    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [showHeader, setShowHeader] = useState(true);
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
                        <TouchableOpacity className=" bg-secondary-100 p-2 rounded-full" onPress={() => {}}>
                            <Image source={icons.box} tintColor="#F15A29FF" className="size-6" />
                        </TouchableOpacity>
                        <View className="flex-row overflow-hidden items-center gap-2">
                            <View className="gap-1 items-end">
                                <Text className="text-lg text-primary-950 font-bold">Latest Movies</Text>
                                <View className={"border border-main-100  px-2 rounded-full"}>
                                    <Text className="text-md">
                                        <Text className=" text-main-50 font-bold"> % </Text>
                                        <Text className=" text-secondary-950 font-bold">20</Text>
                                    </Text>
                                </View>
                            </View>
                            <View className="rounded-full border p-1 border-main-50">
                                <Image source={data[0].url} className="w-14 h-14 rounded-full" />
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
                        data={mealData}
                        renderItem={({item})=>
                            <View className={`${item.id % 2 === 0 ? "bg-secondary-50" : "bg-none"} items-end py-3 rounded`}>
                                <Text className="text-secondary-950 text-md font-bold"> mohmmad <Text className="text-main-50"> {item.id} </Text></Text>
                            </View>
                        }
                        className="gap-1 w-full"
                        scrollEnabled={false}
                    />
                </View>

            </Animated.ScrollView>
        </View>
    );
}
