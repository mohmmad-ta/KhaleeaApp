import {Text, View, TextInput, Image} from "react-native";
import { icons } from "@/constants/icons";

export default function SearchBar() {
  return (
      <View className="flex-row gap-2 bg-white border-2 justify-end border-secondary-100 items-center bg-dark-200 rounded-full px-5 py-3">
          <TextInput
              placeholder="Search"
              className="flex-1 text-right ml-2 font-semibold text-primary-950"
              placeholderTextColor="#F15A29FF"
          />
          <Image source={icons.search} tintColor="#F15A29FF" className="size-6" />
      </View>
  );
}
