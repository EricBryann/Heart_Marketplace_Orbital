import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function HomeScreen(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

export default HomeScreen;
