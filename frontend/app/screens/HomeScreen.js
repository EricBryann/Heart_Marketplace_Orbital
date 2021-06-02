import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  FlatList,
} from "react-native";
import Screen from "../components/Screen";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import HomeItem from "../components/HomeItem";
import { getProducts } from "../Auth/Auth";
import { Ionicons } from "@expo/vector-icons";

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
  useEffect(() => {
    setProductsToShow(
      products.filter((product) => {
        return product.title.startsWith(input);
      })
    );
  }, [input]);

  return (
    <Screen>
        <View style={styles.menu}>

        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableWithoutFeedback>
      </View>
        <View style={styles.productSection}>
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
          ></FlatList>
        </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    flex: 1,
  },
  container: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: colors.lightgrey,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  productsOrUsersButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonSelected: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontWeight: "bold",
  },
  wordSelected: {
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonNotSelected: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 5,
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
});

export default HomeScreen;
