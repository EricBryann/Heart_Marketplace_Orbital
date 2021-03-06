import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import ListItem from "./ListItem";

function FeedItem({ title, imageUri, likes, onItemPress, ownerName, ownerImageUri, key }) {
  const [like, setLike] = useState(false);
  const likeHandler = () => {
    setLike((prev) => !prev);
    console.log("test");
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ListItem
            marginLeft={-20}
            title={ownerName}
            imageUri={ownerImageUri}
            onPress={() => console.log("Press owner")}
            backgroundColor={colors.white}
          />
          <TouchableWithoutFeedback onPress={onItemPress}>
            <Image style={styles.image} source={imageUri} />
          </TouchableWithoutFeedback>
          <View style={styles.details}>
            <View style={styles.titleContainer}>
              <TouchableWithoutFeedback onPress={onItemPress}>
                <Text style={styles.title}>{title}</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.likesContainer}>
              <TouchableWithoutFeedback onPress={likeHandler}>
                {like ? (
                  <MaterialCommunityIcons name="heart" size={28} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={28} />
                )}
              </TouchableWithoutFeedback>
              <View style={styles.numberLikes}>
                <Text style={styles.numberLikesText}>{likes}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 15,
  },
  innerContainer: {
    width: "90%",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").width * 0.6,
  },
  likesContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  numberLikes: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  numberLikesText: {
    fontSize: 16,
  },
  details: {
    flexDirection: "row",
  },
  title: {
    fontSize: 19,
  },
  titleContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },
});

export default FeedItem;
