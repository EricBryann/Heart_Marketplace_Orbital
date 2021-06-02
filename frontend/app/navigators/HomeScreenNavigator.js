import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CardItemDetailsScreen from "../screens/CardItemDetailsScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemDetails"
        component={CardItemDetailsScreen}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};

function AuthNavigator(props) {
  return <StackNavigator />;
}
export default AuthNavigator;
