import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "../screens/SearchScreen";
import CardItemDetails from "../components/CardItemDetails";

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
        component={CardItemDetails}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};

function SearchNavigator(props) {
  return <StackNavigator />;
}
export default SearchNavigator;
