import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { images } from "@/constants/images";

const MealCard = ({id, url,}: Meal) => {
    return (
        <Link href={`/meal/${id}`} asChild>
            <TouchableOpacity className="max-w-[48%] bg-white rounded-xl shadow-md shadow-primary-200">
                <Image source={url} resizeMode="cover" className="w-full h-52 rounded-lg" />

                <View className="p-3">
                    <Text className="text-sm font-bold text-primary-950" numberOfLines={1}>
                        Lorem ipsum dolor sit amet
                    </Text>

                    <View className="flex-row items-center justify-start gap-x-1">
                        <Text className="text-xs text-main-50 font-bold uppercase">
                            4.5
                        </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-light-300 font-medium mt-1">
                            2002
                        </Text>
                        <Text className="text-xs font-medium text-light-300 uppercase">
                            Movie
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MealCard;