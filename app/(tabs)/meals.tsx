import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Meals() {
  return (
      <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-bold text-blue-500">
              meals
          </Text>
      </View>
  );
}
