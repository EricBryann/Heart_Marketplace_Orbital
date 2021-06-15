import React, { useState, useEffect, useRef } from "react";
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
import colors from "../config/colors";
import HomeItem from "../components/HomeItem";
import { getProducts } from "../Auth/Auth";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import ListItem from "../components/list/ListItem";

var products = getProducts();

function HomeScreen({ navigation }) {
  const [selected, setSelected] = useState("products");
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState("all");
  const [productsToShow, setProductsToShow] = useState(products);
  const handleRefresh = () => {
    products = getProducts();
    console.log("refresh");
  };
  const handleChange = (character) => {
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
      backgroundColor: "#fc5c65",
      icon: "account-heart",
      title: "Volunteer",
      id: 2,
    },
    {
      backgroundColor: "#fd9644",
      icon: "bag-checked",
      title: "Jobs",
      id: 3,
    },
    {
      backgroundColor: "#fed330",
      icon: "basketball",
      title: "Sold items",
      id: 4,
    },
    {
      backgroundColor: "#26de81",
      icon: "cash",
      title: "Donation",
      id: 5,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "tshirt-crew",
      title: "Second-hand",
      id: 6,
    },

    {
      backgroundColor: "#778ca3",
      icon: "application",
      title: "Other",
      id: 7,
    },
  ];

  const handleDrawerSlide = (status) => {
    // outputs a value between 0 and 1
    console.log(status);
  };

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
              setInput(item.title.toLowerCase());
              console.log(item.title);
              drawer.current.closeDrawer();
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

  useEffect(() => {
    if (input === "all") return setProductsToShow(products);
    setProductsToShow(
      products.filter((product) => {
        return product.tags.includes(input);
      })
    );
  }, [input]);

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
              <Text style={styles.title}>Heart Marketplace</Text>
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
