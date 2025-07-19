import {Animated, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link, useNavigation, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";
import MealForm from "@/components/MealForm";
import { getMyAllMeals} from "@/services/meals/mealsApi";

export default function Profile() {
    const [modalVisible, setModalVisible] = useState(false);
    const display = ()=>{
        setModalVisible(false)
    }
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

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyAllMeals().then((response) => {
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


                <View className="flex-row mt-20 gap-2 items-center justify-end px-6 w-full">
                    <Text className="text-lg text-secondary-950 font-bold">
                        {typeof modalVisible}
                    </Text>
                    <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                </View>

                <View className="w-full pb-32 px-4">
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <MealCard {...item}/>
                        }
                        keyExtractor={(item) => item.id.toString()}
                        className="mt-2 p-4 bg-white rounded-md w-full"
                        scrollEnabled={false}
                    />
                </View>

                <MealForm togDisplay={display} display={modalVisible} />
            </Animated.ScrollView>
            <TouchableOpacity className="p-3 bg-main-50 absolute bottom-3 left-3 rounded-full" onPress={() => setModalVisible(true)}>
                <Image source={icons.add} tintColor="#fff" className="size-8" />
            </TouchableOpacity>
        </View>
    );
}
