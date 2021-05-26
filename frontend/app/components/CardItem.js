import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../config/colors";

function CardItem({ imageUri, title, price, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/mypic.jpg")}
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
    width: 170,
    height: 210,
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
    fontSize: 20,
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
