import {Text, View, ScrollView, Image, FlatList, Dimensions, Animated, ImageBackground,} from "react-native";
import { useEffect, useRef, useState } from "react";
import {Link, useRouter, useNavigation} from "expo-router";
import Carousel from 'react-native-reanimated-carousel';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { BlurView } from 'expo-blur';
import {colorsVar} from "@/constants/colorsVar"
import ResCard from "@/components/ResCard";
import {getAllRestaurant, getTopRestaurant} from "@/services/meals/mealsApi";

const { width } = Dimensions.get('window');
export default function Home() {
    const router = useRouter();
    const data1 = [
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
                    },
                    headerTintColor: colorsVar.white,
                });
            } else if (value <= 200 && !showHeader) {
                setShowHeader(true);
                navigation.setOptions({ headerShown: false });
            }
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY, showHeader]);

    const [data, setData] = useState<any[]>([]);
    const [dataTop, setDataTop] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopRestaurant().then((response) => {
            setDataTop(response.data);
        })
        getAllRestaurant().then((response) => {
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
                    <View className="">
                        <Carousel
                            width={width}
                            height={500}
                            data={dataTop}
                            autoPlay={true}
                            autoPlayInterval={5000}
                            scrollAnimationDuration={1000}
                            renderItem={({ item, index }) => (
                                <View className="w-full justify-end items-center h-full relative">
                                    <Image source={item.url} resizeMode="cover" className="w-full absolute top-0 left-0 h-full" />
                                    <Image source={images.bot} className="w-full absolute bottom-0 left-0 h-36" />
                                    <View className="h-36 px-10 overflow-hidden py-4 justify-center w-full items-center">
                                        <Text className="text-2xl font-bold text-main-50">{item.name}</Text>
                                        <Text className="text-md text-center text-primary-950 mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur dignissimos error esse impedit inventore mollitia </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </>

                <>
                    <View className="h-36 absolute top-0 left-0">
                        <Image source={images.top} tintColor={colorsVar.secondary} className="w-full h-full absolute top-0 left-0" />
                        <View className="px-6 justify-between flex-row w-full items-center pt-20">
                            <Image source={icons.notification} tintColor="#F15A29FF" className="size-8" />
                            <Image source={images.bg} resizeMode="cover" className="w-36 h-10" />
                        </View>
                    </View>
                </>


                <>
                    <View className="flex-row mt-10 gap-2 items-center justify-end px-6 w-full">
                        <Text className="text-lg text-secondary-950 font-bold">
                            Latest Movies
                        </Text>
                        <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                    </View>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => <ResCard {...item} />}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: "center",
                            paddingHorizontal: 15,
                            paddingVertical: 7.5,
                            gap: 15,
                        }}
                        className="mt-2 pb-32 pt-2 w-full"
                        scrollEnabled={false}
                    />
                </>

            </Animated.ScrollView>
      </View>
  );
}
