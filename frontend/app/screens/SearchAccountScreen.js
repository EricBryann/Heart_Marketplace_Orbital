import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";

function SearchAccountScreen({ route }) {
    const accountDetails = route.params;

    return (
        <Screen style={styles.container}>
        <Text>Search Account Screen</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
  container: {},
});

export default SearchAccountScreen;