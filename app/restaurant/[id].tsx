import {Animated, FlatList, Image, Text, View} from "react-native";
import {Link, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";
import Carousel from "react-native-reanimated-carousel";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";

const Restaurant = () => {
    // const {id} = useLocalSearchParams()
    const router = useRouter();
    const data = [
        { title: 'lorem test 1', url: require('@/assets/images/p1.jpg') },
        { title: 'lorem test 2', url: require('@/assets/images/p2.jpg') },
        { title: 'lorem test 3', url: require('@/assets/images/p3.jpg') },
        { title: 'lorem test 4', url: require('@/assets/images/p4.jpg') },
        { title: 'lorem test 5', url: require('@/assets/images/p5.jpg') },
    ];
    const mealData = [
        { id: '1', url: require('@/assets/images/p1.jpg') },
        { id: '2', url: require('@/assets/images/p2.jpg') },
        { id: '3', url: require('@/assets/images/p3.jpg') },
        { id: '4', url: require('@/assets/images/p4.jpg') },
        { id: '5', url: require('@/assets/images/p5.jpg') },
    ];

    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [showHeader, setShowHeader] = useState(true);

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
                        fontSize: 20,
                    },
                    headerTitle: "Lorem ipsum",
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

    return (
        <View className="bg-screen flex-1">
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
                    <View className="w-full h-96 justify-end items-center relative">
                        <Image source={mealData[2].url} resizeMode="cover" className="w-full absolute top-0 left-0 h-full" />
                        <Image source={images.bot} className="w-full absolute bottom-0 left-0 h-24" />
                        <View className=" px-6 flex-row overflow-hidden py-4 justify-between w-full items-center">
                            <Text className="text-3xl font-bold text-main-50">Lorem ipsum</Text>
                            <View className="mt-1 gap-1 flex-row items-center justify-center">
                                <View className="flex-row px-2 py-0.5 bg-white rounded-full overflow-hidden items-center gap-1">
                                     <Image source={icons.star} tintColor={colorsVar.mainColor} className="size-4" />
                                     <Text className="text-md font-bold text-secondary-950">4.5</Text>
                                </View>
                                <View className="flex-row px-2 py-0.5 bo bg-primary-300 rounded-full overflow-hidden items-center gap-1">
                                    <Image source={icons.star} tintColor={colorsVar.mainColor} className="size-4" />
                                    <Text className="text-md text-white">23m-30m</Text>
                                </View>
                            </View>
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

                    <View className="w-full pb-32 px-4">
                        <FlatList
                            data={mealData}
                            renderItem={({ item }) =>
                                <MealCard {...item}/>
                            }
                            keyExtractor={(item) => item.id.toString()}
                            className="mt-2 p-4 bg-white rounded-md w-full"
                            scrollEnabled={false}
                        />
                    </View>
                </>

            </Animated.ScrollView>
        </View>
    );
}

export default Restaurant