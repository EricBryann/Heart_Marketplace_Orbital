import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Auth } from "../Auth/Auth";
import { auth } from "../api/firebase";

function LogoutScreen() {
  const Authentication = useContext(Auth);

  const logout = async () => {
    Authentication.setUser();
    await auth.signOut();
  };
  useEffect(() => {
    logout();
  });
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});

export default LogoutScreen;
