import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

function AppTextInput({
  iconName,
  placeholderName,
  width = "100%",
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      <MaterialCommunityIcons name={iconName} style={styles.icon} size={20} />
      <TextInput
        placeholder={placeholderName}
        placeholderTextColor={colors.grey}
        style={styles.text}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: colors.lightgrey,
    padding: 15,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 20,
  },
});

export default AppTextInput;
