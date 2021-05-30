import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CardItemDetailsScreen from "../screens/CardItemDetailsScreen";
import AccountScreen from "../screens/AccountScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemPostedDetails"
        component={CardItemDetailsScreen}
      />
    </Stack.Navigator>
  );
};

function AccountMainNavigator(props) {
  return <StackNavigator />;
}
export default AccountMainNavigator;
