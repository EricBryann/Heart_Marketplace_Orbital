import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import CardItemDetailsScreen from "../screens/CardItemDetailsScreen";
import SearchAccountScreen from "../screens/SearchAccountScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchItem"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchItemDetails"
        component={CardItemDetailsScreen}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="SearchAccountDetails"
        component={SearchAccountScreen}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};

function SearchNavigator(props) {
  return <StackNavigator />;
}
export default SearchNavigator;
