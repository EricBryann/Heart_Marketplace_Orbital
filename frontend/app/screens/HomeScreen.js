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
      backgroundColor: "#000000",
      icon: "hexagon-multiple",
      title: "All",
      id: 1,
    },
    {
      backgroundColor: "#fc5c65",
      icon: "floor-lamp",
      title: "Furniture",
      id: 2,
    },
    {
      backgroundColor: "#fd9644",
      icon: "car",
      title: "Cars",
      id: 3,
    },
    {
      backgroundColor: "#fed330",
      icon: "camera",
      title: "Cameras",
      id: 4,
    },
    {
      backgroundColor: "#26de81",
      icon: "cards",
      title: "Games",
      id: 5,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "shoe-heel",
      title: "Clothing",
      id: 6,
    },
    {
      backgroundColor: "#45aaf2",
      icon: "basketball",
      title: "Sports",
      id: 7,
    },
    {
      backgroundColor: "#4b7bec",
      icon: "headphones",
      title: "Movies & Music",
      id: 8,
    },
    {
      backgroundColor: "#a55eea",
      icon: "book-open-variant",
      title: "Books",
      id: 9,
    },
    {
      backgroundColor: "#778ca3",
      icon: "application",
      title: "Other",
      id: 10,
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

            <View style={styles.menu} backgroundColor="white">
              <View style={styles.menuTitle}>
                <Text style={styles.title}>Heart Marketplace</Text>
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
    paddingTop: 29,
    alignItems: "center",
    backgroundColor:"white"
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
    marginBottom:50,
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
  }
});

export default HomeScreen;
