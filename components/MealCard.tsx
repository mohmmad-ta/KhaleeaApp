import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { images } from "@/constants/images";
import {icons} from "@/constants/icons";

const MealCard = ({id, image, description, name, price, slug, restaurantId}: Meal) => {
    return (
        <Link href={`/meal/${id}`} asChild>
            <TouchableOpacity className="w-full mb-3 flex-row items-center justify-end gap-2 rounded-md py-1 overflow-hidden">
                <View className="gap-2 w-[68%] items-end overflow-hidden">
                    <Text className="text-md text-primary-950 text-right max-h-6 font-bold">{name}</Text>
                    <Text className="text-sm text-secondary-950 text-right w-full max-h-10">{description}</Text>
                    <Text className="text-md font-bold gap-2">
                        <Text className="text-main-50"> $ </Text>
                        <Text className="text-secondary-950">{price}</Text>
                    </Text>
                </View>
                <Image source={{uri: image}} className="w-[28%] border border-secondary-100 h-28 rounded-md" />
            </TouchableOpacity>
        </Link>
    );
};

export default MealCard;