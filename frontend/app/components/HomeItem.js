import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import ListItem from "./list/ListItem";
import firebase from "firebase";
import { Auth } from "../Auth/Auth";

function FeedItem({ title, imageUri, likes, onItemPress, ownerName, ownerImageUri, keyVal }) {
  const [like, setLike] = useState(false);

  const Authentication = useContext(Auth);

  const likeHandler = async () => {
    if (!like) {
      setLike((prev) => !prev);
      firebase.database().ref('/Products/' + keyVal + '/likes').set(likes + 1);
      var query = firebase.database().ref().child("/Users").orderByChild("email").equalTo(Authentication.user.email);
      await query.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          const following = firebase.database().ref("/Users/" + child.key + "/Likes").push();
          following
            .set({
              fl: keyVal
            })
            .then(() => {
              console.log("Data updated.");
            });
        });
      });  
    }
    else {
      
    }
  };

  const checkLike = async () => {
    await firebase.database().ref().child("/Users").orderByChild("email").equalTo(Authentication.user.email).once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        firebase.database().ref().child("/Users/" + child.key + "/Likes").once("value", function(snapshot) {
          snapshot.forEach(function(child) {
            if (child.val().fl === keyVal) {
              setLike(true);
            }
          });
        });
      });
    })
  };

  useEffect(() => {checkLike()}, []);

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
          <View style={styles.border}>
            <TouchableWithoutFeedback onPress={onItemPress}>
              <Image style={styles.image} source={{uri: imageUri}} />
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
                    <MaterialCommunityIcons
                      name="heart"
                      size={28}
                      color="red"
                    />
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 15,
    // borderWidth: 1,
    // marginHorizontal: 15,
    // marginBottom: 10,
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
  },
  innerContainer: {
    width: "95%",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").width * 0.6,
    overflow: "hidden",
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
