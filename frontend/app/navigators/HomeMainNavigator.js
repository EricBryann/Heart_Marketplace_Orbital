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
        name="ItemPostedDetails"
        component={CardItemDetailsScreen}
      />
    </Stack.Navigator>
  );
};

function HomeMainNavigator(props) {
  return <StackNavigator />;
}
export default HomeMainNavigator;
