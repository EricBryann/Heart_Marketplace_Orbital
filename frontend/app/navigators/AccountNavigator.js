import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountScreen from "../screens/AccountScreen";
import { TouchableWithoutFeedback, Text } from "react-native";
import LogoutScreen from "../screens/LogoutScreen";
import EditScreen from "../screens/EditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          component={AccountScreen}
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
