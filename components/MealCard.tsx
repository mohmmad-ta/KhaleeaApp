import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { images } from "@/constants/images";
import {icons} from "@/constants/icons";

const MealCard = ({id, image,}: Meal) => {
    return (
        <Link href={`/meal/${id}`} asChild>
            <TouchableOpacity className="w-full mb-3 flex-row items-center justify-end gap-2 rounded-md py-1 overflow-hidden">
                <View className="gap-2 w-[68%] items-end overflow-hidden">
                    <Text className="text-md text-primary-950 text-right max-h-6 font-bold">Latest Movies</Text>
                    <Text className="text-sm text-secondary-950 text-right w-full max-h-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis, earum et facere illo in iure nostrum officia perferendis quae saepe tenetur velit? Animi autem explicabo laudantium magnam necessitatibus quod.</Text>
                    <Text className="text-md font-bold gap-2">
                        <Text className="text-main-50"> $ </Text>
                        <Text className="text-secondary-950">44.99</Text>
                    </Text>
                </View>
                <Image source={{uri: image}} className="w-[28%] border border-secondary-100 h-28 rounded-md" />
            </TouchableOpacity>
        </Link>
    );
};

export default MealCard;