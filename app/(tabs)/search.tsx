import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import ResCard from "@/components/ResCard";

export default function Search() {
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
        { id: '4', url: require('@/assets/images/p4.jpg') },
        { id: '5', url: require('@/assets/images/p5.jpg') },
    ];
  return (
      <View className="bg-screen flex-1">
          <ScrollView
              className="flex-1 pt-20 relative"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{minHeight: "100%"}}
              scrollEventThrottle={16}
          >
              <View className="px-4">
                  <SearchBar />
              </View>
              <View className="w-full px-4 mt-2 items-center justify-center ">
                  <FlatList
                      horizontal
                      data={cat}
                      renderItem={({ item }) =>
                          <TouchableOpacity className="flex-row gap-2 items-center bg-white border-2 border-secondary-100 shadow-md shadow-screens-50 justify-end px-4 py-1 rounded-full">
                              <Text className="text-lg text-secondary-950 font-bold">
                                  {item.id}
                              </Text>
                              <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                          </TouchableOpacity>
                      }
                      keyExtractor={(item) => item.id.toString()}
                      className="w-full "
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ gap: 4, paddingVertical: 4 }}
                  />
              </View>
              <>
                  <FlatList
                      data={mealData}
                      renderItem={({ item }) => <ResCard {...item} />}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={2}
                      columnWrapperStyle={{
                          justifyContent: "center",
                          paddingHorizontal: 15,
                          paddingVertical: 7.5,
                          gap: 15,
                      }}
                      className="pb-32 pt-2 w-full"
                      scrollEnabled={false}
                  />
              </>

          </ScrollView>
      </View>
  );
}
