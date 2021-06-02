import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackComponent,
} from "react-native";
import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = colors.primary,
  width = "100%",
  fontSize = 22,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color, width: width }]}
    >
      <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.white,
  },
});

export default AppButton;
