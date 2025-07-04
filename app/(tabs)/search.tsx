import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Search() {
  return (
      <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-bold text-blue-500">
              Welcome to search!
          </Text>
      </View>
  );
}
