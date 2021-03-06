import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "./app/components/AppButton";
import AuthNavigator from "./app/navigators/AuthNavigator";
import MainNavigator from "./app/navigators/MainNavigator";
import AccountScreen from "./app/screens/AccountScreen";
import AddItemScreen from "./app/screens/AddItemScreen";
import AuthScreen from "./app/screens/AuthScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import { Auth } from "./app/Auth/Auth";
import SearchScreen from "./app/screens/SearchScreen";
import CardItem from "./app/components/CardItem";
import { auth } from "./app/api/firebase";
import AccountNavigator from "./app/navigators/AccountNavigator";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    // <AccountNavigator />
    <Auth.Provider value={{ user, setUser }}>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </Auth.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
