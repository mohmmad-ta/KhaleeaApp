import {Text, View, TextInput, Image} from "react-native";
import { icons } from "@/constants/icons";

export default function SearchBar() {
  return (
      <View className="flex-row gap-1 bg-primary-50 items-center bg-dark-200 rounded-full px-5 py-4">
          <Image source={icons.search} tintColor="#F15A29FF" className="size-7" />

          <TextInput
              placeholder="Search"
              className="flex-1 ml-2 text-white"
              placeholderTextColor="#A8B5DB"
          />
      </View>
  );
}
