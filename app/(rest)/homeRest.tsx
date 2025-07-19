import {
    Text,
    View,
    FlatList,
    Dimensions,
    Animated,
    TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import {Link, useRouter, useNavigation} from "expo-router";
import { BlurView } from 'expo-blur';
import {colorsVar} from "@/constants/colorsVar"
import { getMyAllMeals} from "@/services/meals/mealsApi";
import {useOrderStore} from '@/store/useDataStore';
import {myRestAllOrders} from "@/services/orders/orderApi";

const { width } = Dimensions.get('window');
export default function HomeRest() {
    const router = useRouter();
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [showHeader, setShowHeader] = useState(true);
    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            if (value > 50 && showHeader) {
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
            } else if (value <= 50 && !showHeader) {
                setShowHeader(true);
                navigation.setOptions({ headerShown: false });
            }
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY, showHeader]);

    const [loading, setLoading] = useState(true);
    const { setOrders, orders } = useOrderStore();

    useEffect(() => {
        myRestAllOrders().then((response) => {
            console.log(response.data);
            setOrders(response.data);
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
                    data={orders}
                    renderItem={({ item: order  }) =>
                        <Link className={"w-full px-6"} href={"/shopCard"}>
                            <TouchableOpacity className="w-full p-5 items-end rounded-md bg-white shadow-md shadow-primary-200">
                                <View className="flex-row mb-3 justify-between w-full items-center">
                                    <View className="rounded-full border py-0.5 px-2 border-main-50">
                                        <Text className="text-md text-main-50 font-bold">{order.status}</Text>
                                    </View>
                                    <View className="gap-1 items-end">
                                        <Text className="text-lg text-primary-950 font-bold">{order.userId.phone}</Text>
                                        <Text className="text-sm text-secondary-950">{order.location}</Text>
                                    </View>
                                </View>
                                <View className="w-full">
                                    <FlatList
                                        data={order.item}
                                        renderItem={({item: meal, index})=>
                                            <View className={`${index+1 % 2 === 0 ? "bg-secondary-50" : "bg-none"} items-end py-2 rounded`}>
                                                <Text className="text-secondary-950 text-md font-bold"> {meal.Id.name} <Text className="text-main-50"> {index+1} </Text></Text>
                                            </View>
                                        }
                                        className="gap-1 w-full"
                                        scrollEnabled={false}
                                    />
                                </View>
                                <Text className="text-md w-full text-center mt-1.5 font-bold gap-2">
                                    <Text className="text-main-50"> ID </Text>
                                    <Text className="text-secondary-950">{order.totalPrice}</Text>
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    }
                    keyExtractor={(item) => item.id}
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
