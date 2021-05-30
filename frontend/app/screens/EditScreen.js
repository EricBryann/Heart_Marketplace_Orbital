import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import GoBackHeader from "../components/GoBackHeader";

function EditScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <GoBackHeader onPress={() => navigation.navigate("Account")} />
      <Text>Edit Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditScreen;
