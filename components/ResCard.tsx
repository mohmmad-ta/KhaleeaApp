import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { images } from "@/constants/images";
import {icons} from "@/constants/icons";

const ResCard = ({name, description, id, price, image}: Meal) => {
    return (
        <Link href={`/restaurant/${id}`} asChild>
            <TouchableOpacity className="w-[48%] bg-white rounded-xl shadow-md shadow-primary-200">
                <Image source={{uri: image}} resizeMode="cover" className="w-full h-32 rounded-lg" />

                <View className="p-3">
                    <Text className="text-md font-bold mb-1 text-primary-950 text-center" numberOfLines={1}>
                        Lorem ipsum
                    </Text>
                    <Text className="text-xs font-bold text-center text-secondary-950" numberOfLines={1}>
                        lorem ipsum
                    </Text>

                    <View className="flex-row py-1.5 items-center justify-between">
                        <View className="flex-row items-center justify-start gap-x-1">
                            <Image source={icons.logo} tintColor="#F15A29FF" className="size-4" />
                            <Text className="text-sm text-main-50 font-bold uppercase">
                                4.5
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-start gap-x-1">
                            <Text className="text-sm text-main-50 font-bold uppercase">%</Text>
                            <Text className="text-sm text-secondary-950 font-bold uppercase">10</Text>
                            <Text className="text-sm text-main-50 font-bold uppercase">save</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default ResCard;