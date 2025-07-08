import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import {BlurView} from "expo-blur";
import {colorsVar} from "@/constants/colorsVar";

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
              name="home"
              options={{
                  title: "home",
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
              name="shopCard"
              options={{
                  title: "",
                  headerShown: true,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon={icons.order} title="Save" />
                  ),
                  headerTransparent: true,
                  headerBackground: () => (
                      <BlurView intensity={70} tint="light" style={{ flex: 1 }} />
                  ),
                  headerStyle: {
                      height: 50,
                  },
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