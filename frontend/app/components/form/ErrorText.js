import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../../config/colors";

function ErrorText({ error, visible }) {
  if (!visible || !error) {
    return null;
  }
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default ErrorText;
