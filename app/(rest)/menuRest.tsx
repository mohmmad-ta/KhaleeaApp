import {Animated, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link, useNavigation, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";
import MealForm from "@/components/MealForm";

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
        { id: '1', url: require('@/assets/images/p1.jpg') },
        { id: '2', url: require('@/assets/images/p2.jpg') },
        { id: '3', url: require('@/assets/images/p3.jpg') },
        { id: '4', url: require('@/assets/images/p4.jpg') },
        { id: '5', url: require('@/assets/images/p5.jpg') },
    ];
    const [modalVisible, setModalVisible] = useState(false);
    const display = ()=>{
        setModalVisible(false)
    }
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
                        data={mealData}
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
