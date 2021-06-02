import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";

function MyLikesScreen(props) {
  return (
    <Screen style={styles.container}>
      <Text>My Likes Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MyLikesScreen;
