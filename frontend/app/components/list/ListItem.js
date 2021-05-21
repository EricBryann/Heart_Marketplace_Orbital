import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  imageUri,
  iconName,
  onPress,
  backgroundColor,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View style={styles.logo}>
          {imageUri && <Image style={styles.image} source={imageUri} />}
          {iconName && <MaterialCommunityIcons name={iconName} size={50} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text>{subTitle}</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgrey,
    height: 70,
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    height: 70,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ListItem;
