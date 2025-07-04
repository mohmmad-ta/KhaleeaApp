import { Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SearchBar() {
  return (
      <View className="flex-row gap-1 bg-primary-50 items-center bg-dark-200 rounded-full px-5 py-4">
          <Icon name="search" size={20} color="#AB8BFF" />
          <TextInput
              placeholder="Search"
              className="flex-1 ml-2 text-white"
              placeholderTextColor="#A8B5DB"
          />
      </View>
  );
}
