import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "../screens/LogoutScreen";
import EditScreen from "../screens/EditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeMainNavigator from "./HomeMainNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerPosition="left"
        screenOptions={{ swipeEnabled: false }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeMainNavigator}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

function HomeNavigator(props) {
  return <DrawerNavigator />;
}

export default HomeNavigator;
