import {
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    Animated,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import {Link, useRouter, useNavigation} from "expo-router";
import Carousel from 'react-native-reanimated-carousel';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { BlurView } from 'expo-blur';
import {colorsVar} from "@/constants/colorsVar"
import {getAllMeals} from "@/services/meals/mealsApi";

const { width } = Dimensions.get('window');
export default function HomeRest() {
    const router = useRouter();
    const mealData = [
        { id: 1, url: require('@/assets/images/p1.jpg') },
        { id: 2, url: require('@/assets/images/p2.jpg') },
        { id: 3, url: require('@/assets/images/p3.jpg') },
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllMeals().then((response) => {
                setData(response.data);
                setLoading(false);
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
                className="flex-1 py-20 relative"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{minHeight: "100%"}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >


                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <Link className={"w-full px-6"} href={"/shopCard"}>
                            <TouchableOpacity className="w-full p-5 items-end rounded-md bg-white shadow-md shadow-primary-200">
                                <View className="flex-row mb-3 justify-between w-full items-center">
                                    <View className="rounded-full border py-0.5 px-2 border-main-50">
                                        <Text className="text-md text-main-50 font-bold">Latest</Text>
                                    </View>
                                    <View className="gap-1 items-end">
                                        <Text className="text-lg text-primary-950 font-bold">07716210124</Text>
                                        <Text className="text-sm text-secondary-950">Lorem ipsum dolor</Text>
                                    </View>
                                </View>
                                <View className="w-full">
                                    <FlatList
                                        data={mealData}
                                        renderItem={({item})=>
                                            <View className={`${item.id % 2 === 0 ? "bg-secondary-50" : "bg-none"} items-end py-2 rounded`}>
                                                <Text className="text-secondary-950 text-md font-bold"> mohmmad <Text className="text-main-50"> {item.id} </Text></Text>
                                            </View>
                                        }
                                        className="gap-1 w-full"
                                        scrollEnabled={false}
                                    />
                                </View>
                                <Text className="text-md w-full text-center mt-1.5 font-bold gap-2">
                                    <Text className="text-main-50"> $ </Text>
                                    <Text className="text-secondary-950">44.99</Text>
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    }
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={5}
                    columnWrapperStyle={{
                        justifyContent: "center",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 15,
                    }}
                    className="w-full mb-10"
                    scrollEnabled={false}
                />


            </Animated.ScrollView>
      </View>
  );
}
