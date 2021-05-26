import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";

function HomeScreen(props) {
  return (
    <Screen style={styles.container}>
      <Text>HomeScreeen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

export default HomeScreen;
