import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../config/colors";

function CardItem({
  imageUri,
  title,
  price,
  onPress,
  width = 160,
  height = 200,
  titleFontSize = 18,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { width: width, height: height }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imageUri}}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  imageContainer: {
    flex: 1,
    overflow: "hidden",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  price: {
    color: colors.darkyellow,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});

export default CardItem;
