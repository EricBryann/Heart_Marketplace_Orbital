import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Auth } from "../Auth/Auth";
import { auth } from "../api/firebase";
import { getProductsByUser } from "../Auth/Auth";
import { Ionicons } from "@expo/vector-icons";
import CardItem from "../components/CardItem";
import defaultphoto from "../../assets/mypic.jpg"
import firebase from "firebase";

function SearchAccountScreen({ route }) {
    const accountDetails = route.params;
    const [refresh, onRefresh] = useState(false);
    const [productsPosted, setProductPosted] = useState([]);

    const getAccountProducts = () => {
      const temp = [];
      var ref = firebase.database().ref("/Products");
      var query = ref.orderByChild("uploader").equalTo(accountDetails.username);
      var id = 1;
      query.once("value", function(snapshot) {
          snapshot.forEach(function(child) {
              firebase.storage().ref('/' + child.val().uploader + child.val().title + '0').getDownloadURL().then((url) => {
                  temp.push({
                    imageUri: url,
                    title: child.val().title,
                    price: child.val().price,
                    id: id,
                    description: child.val().description,
                    quantity: child.val().quantity
                  });
                  setProductPosted(temp);
                })
                .catch((e) => {
                  const exampleImageUri = Image.resolveAssetSource(defaultphoto).uri
                  temp.push({
                    imageUri: exampleImageUri,
                    title: child.val().title,
                    price: child.val().price,
                    id: id,
                    description: child.val().description,
                    quantity: child.val().quantity
                  });
                  setProductPosted(temp);
                });
                id ++;
          });
      });
    };

    useEffect(() => {getAccountProducts()}, []);

    const handleRefresh = () => {
      getAccountProducts();
      console.log("refresh");
    };
    return (
        <Screen style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <ScrollView>
                <View style={styles.topContainer}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/mypic.jpg")}
                  />
                  <View style={styles.detailSection}>
                    <View>
                      <Text style={styles.sectionHeaderText}>Posts</Text>
                      <Text style={styles.sectionBodyText}>
                        {productsPosted.length}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.sectionHeaderText}>Followings</Text>
                      <Text style={styles.sectionBodyText}>500</Text>
                    </View>
                    <View>
                      <Text style={styles.sectionHeaderText}>Followers</Text>
                      <Text style={styles.sectionBodyText}>1000</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Follow"
                    />
                </View>
                <View style={styles.userDetailsContainer}>
                  <Text style={styles.username}>
                    {accountDetails.username}
                  </Text>
                  <Text style={styles.userEmail}>{accountDetails.email}</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.productSection}></View>
              </ScrollView>
            }
            data={productsPosted}
            keyExtractor={(product) => product.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <CardItem
                imageUri={item.imageUri}
                title={item.title}
                price={item.price}
                width={160}
                height={180}
              />
            )}
            refreshing={refresh}
            onRefresh={handleRefresh}
            columnWrapperStyle={styles.row}
          ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        marginLeft: 200,
        marginRight: 20
    },
    animatedBox: {
      marginTop: 50,
      flex: 1,
      backgroundColor: "green",
    },
    container: {
      backgroundColor: colors.white,
      zIndex: 0,
      flex: 1,
    },
    profile: {
      marginBottom: 20,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 45,
    },
    topContainer: {
      flexDirection: "row",
      height: 110,
      alignItems: "center",
      paddingLeft: 15,
    },
    username: {
      fontWeight: "bold",
      fontSize: 18,
    },
    userEmail: {},
    userDetailsContainer: {
      paddingHorizontal: 10,
    },
    detailSection: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    sectionHeaderText: {
      fontSize: 15,
      fontWeight: "bold",
    },
    sectionBodyText: {
      textAlign: "center",
    },
    menu: {
      padding: 10,
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    menuTitle: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      color: colors.black,
    },
    horizontalLine: {
      width: "100%",
      height: 1,
      backgroundColor: colors.lightgrey,
      marginTop: 10,
    },
    row: {
      flex: 1,
      justifyContent: "space-between",
    },
  });

export default SearchAccountScreen;