import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Modal,
  FlatList,
} from "react-native";
import Screen from "../components/Screen";
import { FontAwesome } from "@expo/vector-icons";
import { Auth } from "../Auth/Auth";
import colors from "../config/colors";
import HomeItem from "../components/HomeItem";
import { getProducts } from "../Auth/Auth";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import defaultphoto from "../../assets/blank_pp.png";

import ListItem from "../components/list/ListItem";

function HomeScreen({ navigation }) {
  const [selected, setSelected] = useState("products");
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState("All");
  const [productsToShow, setProductsToShow] = useState([]);
  const [followList, setFollowList] = useState([]);
  const Authentication = useContext(Auth);



  const checkFollow = async () => {
    await firebase.database().ref().child("/Users").orderByChild("email").equalTo(Authentication.user.email).once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        firebase.database().ref().child("/Users/" + child.key + "/Followings").once("value", function(snapshot) {
          snapshot.forEach(function(child) {
            followList.push(child.val().email);
            console.log(followList.length);
          });
        });
      });
    })
  };

  useEffect(() => {checkFollow()}, []);


  const getProductsToShow = () => {
    const initialValue = [];

    var id = 1;
  
    var ref = firebase.database().ref("/Products");
    var query = 
      (input !== "All" ? 
        (input !== "Following" ? 
          ref.orderByChild("category").equalTo(input) : 
          (followList.length > 0 ? 
            ref.orderByChild("uploaderemail").equalTo(followList[0]) :
            ref) 
        ) :
      ref);

    query.once("value", function (snapshot) {
      snapshot.forEach(function (snap) {
        firebase
          .storage()
          .ref("/" + snap.val().uploader + snap.val().title + "0")
          .getDownloadURL()
          .then((url) => {
            initialValue.push({
              imageUri: url,
              title: snap.val().title,
              quantity: snap.val().quantity,
              price: snap.val().price,
              id: id,
              description: snap.val().description,
              ownerName: snap.val().uploader,
              ownerImageUri: require("../../assets/blank_pp.png"),
              tags: snap.val().category,
            });
            setProductsToShow(initialValue);
            id++;
          })
          .catch((e) => {
            const exampleImageUri = Image.resolveAssetSource(defaultphoto).uri;
            initialValue.push({
              imageUri: exampleImageUri,
              title: snap.val().title,
              quantity: snap.val().quantity,
              price: snap.val().price,
              id: id,
              description: snap.val().description,
              ownerName: snap.val().uploader,
              ownerImageUri: require("../../assets/blank_pp.png"),
              tags: snap.val().category,
            });
          });
      });
    });
  };

  useEffect(() => {
    getProductsToShow();
  }, []);

  const handleRefresh = () => {
    checkFollow();
    getProductsToShow();
    console.log("refresh");
  };

  const handleChangeDrawer = (character) => {
    setInput(character);
  };

  const categories = [
    {
      backgroundColor: "#000000",
      icon: "hexagon-multiple",
      title: "All",
      id: 1,
    },
    {
      backgroundColor: "#67f71f",
      icon: "account-multiple",
      title: "Following",
      id: 2,
    },
    {
      backgroundColor: "#fc5c65",
      icon: "account-heart",
      title: "Volunteer",
      id: 3,
    },
    {
      backgroundColor: "#fd9644",
      icon: "bag-checked",
      title: "Jobs",
      id: 4,
    },
    {
      backgroundColor: "#fed330",
      icon: "basketball",
      title: "Sold items",
      id: 5,
    },
    {
      backgroundColor: "#26de81",
      icon: "cash",
      title: "Donation",
      id: 6,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "tshirt-crew",
      title: "Second-hand",
      id: 7,
    },

    {
      backgroundColor: "#778ca3",
      icon: "application",
      title: "Other",
      id: 8,
    },
  ];

  const drawer = useRef();
  const renderDrawer = (
    <View style={styles.drawer}>
      <FlatList
        data={categories}
        keyExtractor={(category) => category.id.toString()}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              setInput(item.title);
              console.log(item.title);
              drawer.current.closeDrawer();
              handleRefresh();
            }}
          >
            <View style={styles.category}>
              <MaterialCommunityIcons
                name={item.icon}
                size={50}
                color={item.backgroundColor}
              ></MaterialCommunityIcons>
              <Text>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );

  return (
    <View style={styles.fl}>
      <DrawerLayout
        ref={drawer}
        drawerBackgroundColor="white"
        drawerWidth={100}
        keyboardDismissMode="on-drag"
        statusBarBackgroundColor="blue"
        renderNavigationView={() => renderDrawer}
      >
        <View style={styles.home}>
          <View style={styles.menu} backgroundColor="white">
            <View style={styles.menuTitle}>
              <Text style={styles.title}>Ad-plication</Text>
            </View>
            <View style={styles.chatIcon}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Chat")}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  color={colors.black}
                  size={27}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <FlatList
            style={styles.list}
            data={productsToShow}
            keyExtractor={(product) => product.id.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <HomeItem
                title={item.title}
                price={item.price}
                imageUri={item.imageUri}
                ownerName={item.ownerName}
                onItemPress={() =>
                  navigation.navigate("ItemPostedDetails", {
                    ...item,
                    withTradeButton: true,
                  })
                }
                ownerImageUri={item.ownerImageUri}
              />
            )}
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        </View>
      </DrawerLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  fl: {
    flex: 1,
  },
  chatIcon: {
    marginRight: 5,
  },
  drawer: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  category: {},

  container: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  home: {
    paddingTop: 29,
    // alignItems: "center",
    backgroundColor: "white",
  },

  productSection: {
    marginBottom: 0,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  userItem: {
    marginVertical: 5,
  },
  headerContainer: {
    padding: 10,
  },
  menuTitle: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    marginBottom: 50,
  },
  menu: {
    padding: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  headerText: {
    fontSize: 20,
    fontFamily: "serif",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
  },
});

export default HomeScreen;
