import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";

function Screen({ children, style }) {
  return <View style={[styles.view, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Screen;
