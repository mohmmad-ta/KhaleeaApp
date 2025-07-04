import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function TabIcon({ focused, icon, title }: any) {
    if (focused) {
        return (
            <View
                className="w-full overflow-hidden"
            >
                <Icon name={icon} size={25} color="#F15A29FF" />
            </View>
        );
    }

    return (
        <View
            className="w-full overflow-hidden"
        >
            <Icon name={icon} size={25} color="#7171717F" />
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
                      <TabIcon focused={focused} icon="home" title="Home" />
                  ),
              }}
          />

          <Tabs.Screen
              name="search"
              options={{
                  title: "Search",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon="search" title="Search" />
                  ),
              }}
          />

          <Tabs.Screen
              name="meals"
              options={{
                  title: "meals",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon="list-ul" title="Save" />

                  ),
              }}
          />

          <Tabs.Screen
              name="profile"
              options={{
                  title: "Profile",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                      <TabIcon focused={focused} icon="user" title="Profile" />
                  ),
              }}
          />
      </Tabs>
  );
}
export default RootLayout;