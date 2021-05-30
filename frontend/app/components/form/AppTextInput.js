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
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={placeholderName}
          placeholderTextColor={colors.grey}
          style={styles.text}
          {...otherProps}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: colors.lightgrey,
    padding: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 20,
  },
  textInputContainer: {
    flex: 1,
  },
});

export default AppTextInput;
