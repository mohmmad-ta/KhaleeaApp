import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";

function TabIcon({ focused, icon, title }: any) {
    if (focused) {
        return (
            <View
                className="w-full overflow-hidden"
            >
                <Image source={icon} tintColor="#F15A29FF" className="size-8" />
            </View>
        );
    }

    return (
        <View
            className="w-full overflow-hidden"
        >
            <Image source={icon} tintColor="#717171" className="size-8" />
        </View>
    );
}
const RootLayout = () =>{
  return (
      <Tabs
          screenOptions={{
              tabBarShowLabel: false,
              tabBarItemStyle: {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
              },
              tabBarStyle: {
                  height: 100,
              },
          }}
      >
          <Tabs.Screen
              name="index"
              options={{
                  title: "index",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon={icons.home} title="Home" />
                  ),
              }}
          />

          <Tabs.Screen
              name="search"
              options={{
                  title: "Search",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon={icons.search} title="Search" />
                  ),
              }}
          />

          <Tabs.Screen
              name="meals"
              options={{
                  title: "meals",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon={icons.order} title="Save" />

                  ),
              }}
          />

          <Tabs.Screen
              name="profile"
              options={{
                  title: "Profile",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon={icons.user} title="Profile" />
                  ),
              }}
          />
      </Tabs>
  );
}
export default RootLayout;