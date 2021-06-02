import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "../screens/LogoutScreen";
import EditScreen from "../screens/EditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountMainNavigator from "./AccountMainNavigator";
import MyLikesScreen from "../screens/MyLikesScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerPosition="right"
        screenOptions={{ swipeEnabled: false }}
      >
        <Drawer.Screen
          name="Account"
          component={AccountMainNavigator}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Edit Profile"
          component={EditScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-edit"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="My Likes"
          component={MyLikesScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Log Out"
          component={LogoutScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

function AccountNavigator(props) {
  return <DrawerNavigator />;
}
export default AccountNavigator;
