import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { MaterialCommunityIcons } from "@expo/vector-icons";


import ListItem from "../components/list/ListItem";

const products = getProducts();



function HomeScreen({ navigation }) {
  const [selected, setSelected] = useState("products");
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState("");
  const [productsToShow, setProductsToShow] = useState(products);
  const handleRefresh = () => {
    console.log("refresh");
  };
  const handleChange = (character) => {
    setInput(character);
  };

  const categories = [
    {
      backgroundColor: "#fc5c65",
      icon: "floor-lamp",
      title: "Furniture",
      id: 1,
    },
    {
      backgroundColor: "#fd9644",
      icon: "car",
      title: "Cars",
      id: 2,
    },
    {
      backgroundColor: "#fed330",
      icon: "camera",
      title: "Cameras",
      id: 3,
    },
    {
      backgroundColor: "#26de81",
      icon: "cards",
      title: "Games",
      id: 4,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "shoe-heel",
      title: "Clothing",
      id: 5,
    },
    {
      backgroundColor: "#45aaf2",
      icon: "basketball",
      title: "Sports",
      id: 6,
    },
    {
      backgroundColor: "#4b7bec",
      icon: "headphones",
      title: "Movies & Music",
      id: 7,
    },
    {
      backgroundColor: "#a55eea",
      icon: "book-open-variant",
      title: "Books",
      id: 8,
    },
    {
      backgroundColor: "#778ca3",
      icon: "application",
      title: "Other",
      id: 9,
    },
  ];

  const handleDrawerSlide = (status) => {
    // outputs a value between 0 and 1
    console.log(status);
  };

  const renderDrawer = (
      <View style={styles.drawer}>
          <FlatList
            data={categories}
            keyExtractor={(category) => category.id.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
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
    setProductsToShow(
      products.filter((product) => {
        return product.title.startsWith(input);
      })
    );
  }, [input]);



  return (
    <View style = {styles.fl}>
        <DrawerLayout
          drawerBackgroundColor="white"
          drawerWidth={100}
          keyboardDismissMode="on-drag"
          statusBarBackgroundColor="blue"
          renderNavigationView={() => renderDrawer}
          >
            <View style={styles.home}>
            <FlatList
                data={productsToShow}
                keyExtractor={(product) => product.id.toString()}
                numColumns={1}
                renderItem={({ item }) => (
                  <HomeItem
                    title={item.title}
                    price={item.price}
                    onPress={() => navigation.navigate("SearchItemDetails", item)}
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
  drawer: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  category:{

  },

  container: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  home: {
    paddingTop: 20,
    alignItems: "center",
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
  headerText: {
    fontSize: 20,
    fontFamily: "serif",
  },
});

export default HomeScreen;
