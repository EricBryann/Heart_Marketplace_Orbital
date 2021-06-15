import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Auth } from "../Auth/Auth";
import { auth } from "../api/firebase";
import { getProductsByUser } from "../Auth/Auth";
import { Ionicons } from "@expo/vector-icons";
import CardItem from "../components/CardItem";
import firebase from "firebase";

function AccountScreen({ navigation }) {
  const [refresh, onRefresh] = useState(false);
  const [productsPosted, setProductPosted] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);

  const Authentication = useContext(Auth);

  const checkFollow = async () => {
    await firebase.database().ref().child("/Users").orderByChild("email").equalTo(Authentication.user.email).once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        firebase.database().ref().child("/Users/" + child.key + "/Followers").once("value", function(snapshot) {
          setFollowers(snapshot.numChildren() - 1);
        });
        firebase.database().ref().child("/Users/" + child.key + "/Followings").once("value", function(snapshot) {
          setFollowings(snapshot.numChildren() - 1);
        });
      });
    })
  };

  useEffect(() => {checkFollow()}, []);


  const handleRefresh = () => {
    checkFollow();
    getAccountProducts();
    console.log("refresh");
  };

  console.log(productsPosted.length);
  

  const getAccountProducts = async () => {
    const temp = [];
    var ref = firebase.database().ref("/Products");
    var query = ref
      .orderByChild("uploader")
      .equalTo(Authentication.user.displayName);
    var id = 1;
    await query.once("value", function (snapshot) {
      snapshot.forEach(function (child) {
        firebase
          .storage()
          .ref("/" + child.val().uploader + child.val().title + "0")
          .getDownloadURL()
          .then((url) => {
            temp.push({
              imageUri: url,
              title: child.val().title,
              price: child.val().price,
              id: id,
              description: child.val().description,
              quantity: child.val().quantity,
            });
            id++;
            setProductPosted(temp);
          })
          .catch((e) => {
            const exampleImageUri = Image.resolveAssetSource(defaultphoto).uri;
            temp.push({
              imageUri: exampleImageUri,
              title: child.val().title,
              price: child.val().price,
              id: id,
              description: child.val().description,
              quantity: child.val().quantity,
            });
            id++;
            setProductPosted(temp);
          });
      });
    });
  };

  useEffect(() => {getAccountProducts()}, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.menuTitle}>
          <Text style={styles.title}>Ad-plication</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={35} color="black" />
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        ListHeaderComponent={
          <ScrollView>
            <View style={styles.topContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/blank_pp.png")}
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
                  <Text style={styles.sectionBodyText}>{followings}</Text>
                </View>
                <View>
                  <Text style={styles.sectionHeaderText}>Followers</Text>
                  <Text style={styles.sectionBodyText}>{followers}</Text>
                </View>
              </View>
            </View>
            <View style={styles.userDetailsContainer}>
              <Text style={styles.username}>
                {Authentication.user.displayName}
              </Text>
              <Text style={styles.userEmail}>{Authentication.user.email}</Text>
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
            onPress={() => navigation.navigate("ItemPostedDetails", item)}
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

export default AccountScreen;
