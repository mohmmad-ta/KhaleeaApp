import { Text, View } from "react-native";
import {useLocalSearchParams} from "expo-router";

const MealDetails = () => {
    const {id} = useLocalSearchParams()
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-red-900 text-5xl">meals Details {id}</Text>
        </View>
    )
}

export default MealDetails