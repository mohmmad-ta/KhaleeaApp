import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

const OldOrders = () => {
    const cat = [
        { id: 'test 1', url: require('@/assets/images/p1.jpg') },
        { id: 'test 2', url: require('@/assets/images/p1.jpg') },
        { id: 'test 3 mohmmad', url: require('@/assets/images/p1.jpg') },
        { id: 'test 4', url: require('@/assets/images/p1.jpg') },
        { id: 'test 5', url: require('@/assets/images/p1.jpg') },
    ];
    const mealData = [
        { id: '1', url: require('@/assets/images/p1.jpg') },
        { id: '2', url: require('@/assets/images/p2.jpg') },
        { id: '3', url: require('@/assets/images/p3.jpg') },
    ];
    return (
        <View className="bg-screen flex-1">
            <ScrollView
                className="flex-1 px-4 pt-32"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{minHeight: "100%"}}
            >
                <FlatList
                    data={mealData}
                    renderItem={({ item }) =>
                        <Link href={"/shopCard"}>
                            <TouchableOpacity className="w-full p-5 items-end rounded-md bg-white shadow-md shadow-primary-200">
                                <View className="flex-row justify-between w-full items-center">
                                    <Image source={icons.logo} className="size-6" />
                                    <View className="flex-row overflow-hidden items-center gap-2">
                                        <View className="gap-1 items-end">
                                            <Text className="text-lg text-primary-950 font-bold">Latest Movies</Text>
                                            <Text className="text-sm text-secondary-950">2025/6/3</Text>
                                        </View>
                                        <View className="rounded-full border-2 p-1 border-main-50">
                                            <Image source={cat[0].url} className="w-14 h-14 rounded-full" />
                                        </View>
                                    </View>
                                </View>
                                <View className="w-full">
                                    <FlatList
                                        data={mealData}
                                        renderItem={({item})=>
                                            <Text className="text-secondary-950 text-sm">mohmmad<Text className="text-main-50"> {item.id} </Text></Text>
                                        }
                                        className="gap-1 w-full items-end mt-2"
                                        scrollEnabled={false}
                                    />
                                </View>
                                <Text className="text-md w-full text-center mt-1 font-bold gap-2">
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
                    className="w-full"
                    scrollEnabled={false}
                />

            </ScrollView>
        </View>
    )
}

export default OldOrders