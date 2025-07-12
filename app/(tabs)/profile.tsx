import {Text, TouchableOpacity, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {logout} from "@/utils/utils";
const router = useRouter();
export default function Profile() {
    const logOut = async () => {
        await logout()
        router.replace('/login');
    }
  return (
      <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-bold text-blue-500">
              Welcome to profile!
              <TouchableOpacity
                  onPress={logOut}
                  className="p-2 mt-8 w-[70%] rounded-md bg-main-50"
              >
                  <Text className="text-white font-bold w-full text-center">Custom Button</Text>
              </TouchableOpacity>
          </Text>
      </View>
  );
}
