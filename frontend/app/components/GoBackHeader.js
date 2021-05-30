import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function GoBackHeader({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <FontAwesome5 name="arrow-left" size={20} style={{ paddingLeft: 10 }} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    height: 35,
  },
});

export default GoBackHeader;
