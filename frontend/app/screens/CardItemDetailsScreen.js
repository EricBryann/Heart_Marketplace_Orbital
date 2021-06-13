import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppButton from "../components/AppButton";

function CardItemDetailsScreen({ route }) {
  const itemDetails = route.params;
  const withTradeButton = route.params.withTradeButton;
  const [isLiked, setIsLiked] = useState(false);
  const [trade, setTrade] = useState(false);
  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{itemDetails.title}</Text>
      </View>
      <View>
        <Image
          style={styles.image}
          source={{uri: itemDetails.imageUri}}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.tradePriceContainer}>
          <View style={styles.tradeLikeContainer}>
            <View style={styles.likeNumberContainer}>
              <TouchableWithoutFeedback onPress={handleLike}>
                {isLiked ? (
                  <MaterialCommunityIcons name="heart" size={30} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={30} />
                )}
              </TouchableWithoutFeedback>
              <Text style={styles.likeNumber}>17 Likes</Text>
            </View>
            <View style={styles.tradeButtonContainer}>
              {withTradeButton && (
                <AppButton
                  width="40%"
                  title="Trade"
                  onPress={() => console.log("trade " + itemDetails.id)}
                  fontSize={18}
                />
              )}
            </View>
          </View>
          <Text style={styles.price}>Price : ${itemDetails.price}</Text>
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
  titleContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
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
  tradePriceContainer: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  tradeLikeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tradeButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  likeNumberContainer: {
    flexDirection: "row",
  },
  likeNumber: {
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default CardItemDetailsScreen;
