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
                name="homeDeli"
                options={{
                    title: "homeDeli",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="orderDeli"
                options={{
                    title: "orderDeli",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.menu} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profileDeli"
                options={{
                    title: "profileDeli",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.user} title="Home" />
                    ),
                }}
            />
        </Tabs>
    );
}
export default RootLayout;