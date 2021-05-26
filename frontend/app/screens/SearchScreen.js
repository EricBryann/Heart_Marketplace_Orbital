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
import CardItem from "../components/CardItem";
import { getProducts, getUsers } from "../Auth/Auth";
import ListItem from "../components/list/ListItem";

const products = getProducts();
const users = getUsers();

function SearchScreen({ navigation }) {
  const [selected, setSelected] = useState("products");
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState("");
  const [productsToShow, setProductsToShow] = useState(products);
  const [usersToShow, setUsersToShow] = useState(users);
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
    setUsersToShow(
      users.filter((user) => {
        if (input === "") return null;
        return user.username.startsWith(input);
      })
    );
  }, [input]);

  return (
    <Screen>
      <View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => console.log(input)}>
            <FontAwesome name="search" size={20} color="black" />
          </TouchableWithoutFeedback>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchText}
              placeholderTextColor={colors.grey}
              placeholder="Search"
              onChangeText={handleChange}
              value={input}
            />
          </View>
        </View>
        <View style={styles.productsOrUsersButtons}>
          <TouchableWithoutFeedback onPress={() => setSelected("products")}>
            <View
              style={
                selected === "products"
                  ? styles.buttonSelected
                  : styles.buttonNotSelected
              }
            >
              <Text style={selected === "products" && styles.wordSelected}>
                Products
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelected("users")}>
            <View
              style={
                selected === "users"
                  ? styles.buttonSelected
                  : styles.buttonNotSelected
              }
            >
              <Text style={selected === "users" && styles.wordSelected}>
                Users
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {selected === "products" && (
        <View style={styles.productSection}>
          <FlatList
            data={productsToShow}
            keyExtractor={(product) => product.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <CardItem
                title={item.title}
                price={item.price}
                onPress={() => navigation.navigate("SearchItemDetails", item)}
              />
            )}
            refreshing={refresh}
            onRefresh={handleRefresh}
            columnWrapperStyle={styles.row}
          ></FlatList>
        </View>
      )}
      {selected === "users" && (
        <View style={styles.usersSection}>
          {usersToShow.map((user) => {
            return (
              <View style={styles.userItem}>
                <ListItem
                  key={user.username}
                  title={user.username}
                  subTitle={user.name}
                  imageUri={require("../../assets/mypic.jpg")}
                />
              </View>
            );
          })}
        </View>
      )}
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
    marginBottom: 100,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  userItem: {
    marginVertical: 5,
  },
});

export default SearchScreen;
