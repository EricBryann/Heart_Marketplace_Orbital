import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

function Screen({ children, style }) {
  return <View style={[styles.view, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
