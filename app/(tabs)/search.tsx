import {FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {icons} from "@/constants/icons";
import ResCard from "@/components/ResCard";
import {useEffect, useState} from "react";
import {getSearch} from "@/services/meals/mealsApi";


export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.length > 0) {
                getSearch(searchTerm).then((data)=>{setMeals(data.data)});
                console.log(meals)
            } else {
                setMeals([]);
            }
        }, 500); // debounce time

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

  return (
      <View className="bg-screen flex-1">
          <ScrollView
              className="flex-1 pt-20 relative"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{minHeight: "100%"}}
              scrollEventThrottle={16}
          >
              <View className="px-4">
                  <View className="flex-row gap-2 bg-white border-2 justify-end border-secondary-100 items-center bg-dark-200 rounded-full px-5 py-3">
                      <TextInput
                          placeholder="Search"
                          className="flex-1 text-right ml-2 font-semibold text-primary-950"
                          placeholderTextColor="#F15A29FF"
                          value={searchTerm}
                          onChangeText={setSearchTerm}
                      />
                      <Image source={icons.search} tintColor="#F15A29FF" className="size-6" />
                  </View>
              </View>
              <View className="w-full px-4 mt-2 items-center justify-center ">
                  <FlatList
                      horizontal
                      data={meals}
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
                      data={meals}
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
