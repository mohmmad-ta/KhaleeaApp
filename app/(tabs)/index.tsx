import {Text, View, ScrollView, Image, FlatList, Dimensions} from "react-native";
import {Link, useRouter} from "expo-router";
// import SearchBar from "@/components/SearchBar";
// import useFetch from "@/services/usefetch";
// import {fetchMovies} from "@/services/api";
import MealCard from "@/components/MealCard";
import Carousel from 'react-native-reanimated-carousel';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";


const { width } = Dimensions.get('window');
export default function Index() {
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

  return (
      <View className="bg-screen flex-1">
            <ScrollView className="flex-1 relative" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: "100%"}}>

                <>
                    <View className="">
                        <Carousel
                            width={width}
                            height={500}
                            data={data}
                            autoPlay={true}
                            autoPlayInterval={5000}
                            scrollAnimationDuration={1000}
                            renderItem={({ item, index }) => (
                                <View className="w-full justify-end items-center h-full relative">
                                    <Image source={item.url} resizeMode="cover" className="w-full absolute top-0 left-0 h-full" />
                                    <View className="h-36 bg-primary-50 px-10 overflow-hidden py-4 justify-center w-full items-center">
                                        <Text className="text-2xl font-bold text-white">{item.title}</Text>
                                        <Text className="text-md text-center text-white mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur dignissimos error esse impedit inventore mollitia </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </>

                <>
                    <View className="h-36 bg-secondary-500 absolute top-0 left-0 px-6 pt-12 justify-between flex-row w-full items-center">
                        <Image source={icons.search} tintColor="#F15A29FF" className="size-8" />
                        <Image source={images.bg} resizeMode="cover" className="w-36 h-10" />
                    </View>
                </>

                <>
                    <Text className="text-lg text-primary-950 font-bold mt-5 mb-3">
                        Latest Movies
                    </Text>

                    <FlatList
                        data={mealData}
                        renderItem={({ item }) => <MealCard {...item} />}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={5}
                        columnWrapperStyle={{
                            justifyContent: "center",
                            display: "flex",
                            flexWrap: "wrap",
                            padding: 20,
                            gap: 15,
                        }}
                        className="mt-2 pb-32 w-full"
                        scrollEnabled={false}
                    />
                </>

            </ScrollView>
      </View>
  );
}
