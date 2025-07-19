import {Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import MealCard from "@/components/MealCard";
import SearchBar from "@/components/SearchBar";
import {Link} from "expo-router";
import {useDataStore} from '@/store/useDataStore';
import {useEffect} from "react";

export default function ShopCard() {
    const card = useDataStore((state:any) => state.shopCard);
    const setcard = useDataStore((state:any) => state.setShopCard);
    const updateShopCard = useDataStore((state:any) => state.updateShopCard);

    const cat = [
        { id: 'test 1', url: require('@/assets/images/p1.jpg') },
        { id: 'test 2', url: require('@/assets/images/p1.jpg') },
        { id: 'test 3 mohmmad', url: require('@/assets/images/p1.jpg') },
        { id: 'test 4', url: require('@/assets/images/p1.jpg') },
        { id: 'test 5', url: require('@/assets/images/p1.jpg') },
    ];
  return (
      <View className="bg-screen flex-1">
          <ScrollView
              className="flex-1 px-4 pt-[4.5rem] relative"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{minHeight: "100%"}}
              scrollEventThrottle={16}
          >
              <View className="flex-row mb-6 p-1 flex-nowrap flex w-full items-center justify-between">
                  <Link href="/oldOrders">
                      <Image source={icons.menu} tintColor="#F15A29FF" className="size-8" />
                  </Link>
                  <View className="flex-row gap-2 items-center">
                      <Text className="text-lg text-secondary-950 font-bold">
                          Latest Movies
                      </Text>
                      <Image source={icons.logo} tintColor="#F15A29FF" className="size-8" />
                  </View>
              </View>

              <View className="w-full p-4 items-end rounded-md bg-white">
                  <View className="flex-row overflow-hidden items-center gap-2">
                      <View className="gap-1 items-end">
                          <Text className="text-lg text-primary-950 font-bold">Latest Movies</Text>
                          <Text className="text-md text-secondary-950">Latest Movies</Text>
                      </View>
                      <View className="rounded-full border-2 p-1 border-main-50">
                          <Image source={cat[0].url} className="w-14 h-14 rounded-full" />
                      </View>
                  </View>
                  <View className="w-full h-0.5 bg-secondary-100 my-3 rounded-full"></View>
                  <FlatList
                      data={card}
                      renderItem={({ item, index }) =>
                          <View className="w-full mb-3 flex-row items-center justify-between rounded-md bg-white">
                              <View className="flex-row items-center gap-2">
                                  <TouchableOpacity
                                      onPress={() => {
                                          if(item.count>1) updateShopCard(index, item.count - 1)
                                      }}
                                      className="p-2"
                                  >
                                      <Image source={icons.remove} tintColor="#F15A29FF" className="size-6" />
                                  </TouchableOpacity>
                                  <Text className="text-lg text-secondary-950 font-bold">{item.count}</Text>
                                  <TouchableOpacity
                                      onPress={() => updateShopCard(index, item.count + 1)}
                                      className="p-2"
                                  >
                                      <Image source={icons.add} tintColor="#F15A29FF" className="size-6" />
                                  </TouchableOpacity>
                              </View>
                              <View className="flex-row items-center gap-2">
                                  <View className="gap-2 items-end">
                                      <Text className="text-lg text-primary-950 max-w-48 max-h-6 font-bold">Latest Movies</Text>
                                      <Text className="text-lg font-bold gap-2">
                                          <Text className="text-main-50"> $ </Text>
                                          <Text className="text-secondary-950">{item.item.price * item.count}</Text>
                                      </Text>
                                  </View>
                                  <Image source={item.url} className="w-28 h-28 rounded-md" />
                              </View>
                          </View>
                      }
                      keyExtractor={(item, index) => index.toString()}
                      className="w-full"
                      scrollEnabled={false}
                  />
              </View>

          </ScrollView>
          <View className="absolute p-6 pb-10 w-full bg-white bottom-0 left-0" >
              <View className="flex-row w-full justify-center items-center gap-3">
                  <TouchableOpacity
                      onPress={() => alert('Pressed!')}
                      className="p-2 w-[70%] rounded-md bg-main-50"
                  >
                      <Text className="text-white font-bold w-full text-center">Custom Button</Text>
                  </TouchableOpacity>
                  <Text className="text-lg text-center w-[30%] font-bold gap-2">
                      <Text className="text-main-50"> $ </Text>
                      <Text className="text-secondary-950">{card.reduce((sum: any, item: any) => sum + item.count * item.item.price, 0)}</Text>
                  </Text>
              </View>
          </View>
      </View>
  );
}
