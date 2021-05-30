import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function CardItemDetailsScreen({ route }) {
  const itemDetails = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/mypic.jpg")}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.titlePriceContainer}>
          <View style={styles.titleLikeContainer}>
            <Text style={styles.title}>{itemDetails.title}</Text>
            <TouchableWithoutFeedback onPress={handleLike}>
              {isLiked ? (
                <MaterialCommunityIcons name="heart" size={35} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={30} />
              )}
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.price}>Price Range : ${itemDetails.price}</Text>
          <Text style={styles.quantity}>
            Quantity Left : {itemDetails.quantity}
          </Text>
        </View>
        <Text style={styles.description}>{itemDetails.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
  },
  details: {
    padding: 15,
  },
  price: {
    color: colors.darkyellow,
  },
  quantity: {
    color: colors.red,
  },
  description: {
    marginTop: 40,
    marginBottom: 150,
    fontSize: 16,
  },
  titlePriceContainer: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  titleLikeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CardItemDetailsScreen;
