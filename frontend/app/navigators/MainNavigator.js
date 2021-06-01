import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItemScreen from "../screens/AddItemScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigator from "./HomeScreenNavigator";
import SearchNavigator from "./SearchNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{}}>
    <Tab.Screen
      name="Home"
      component={HomeScreenNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Search"
      component={SearchNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="search" color={color} size={size}></FontAwesome>
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Add Item"
      component={AddItemScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    ></Tab.Screen>
  </Tab.Navigator>
);

function MainNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default MainNavigator;
