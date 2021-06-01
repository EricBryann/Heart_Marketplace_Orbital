import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import FeedItem from "../components/list/FeedItem";

const items = [
  {
    title: "Pillow",
    price: 10,
    quantity: 1,
    imageUri: require("../../assets/mypic.jpg"),
    backgroundColor: colors.white,
    ownerName: "Eric Bryan",
    ownerImageUri: require("../../assets/mypic.jpg"),
    id: 1,
  },
  {
    title: "Bolster",
    price: 10,
    quantity: 1,
    imageUri: require("../../assets/mypic.jpg"),
    backgroundColor: colors.white,
    ownerName: "William",
    ownerImageUri: require("../../assets/mypic.jpg"),
    id: 2,
  },
  {
    title: "Bottle",
    price: 10,
    quantity: 1,
    imageUri: require("../../assets/mypic.jpg"),
    backgroundColor: colors.white,
    ownerName: "William",
    ownerImageUri: require("../../assets/mypic.jpg"),
    id: 3,
  },
  {
    title: "Eraser",
    price: 10,
    quantity: 1,
    imageUri: require("../../assets/mypic.jpg"),
    backgroundColor: colors.white,
    ownerName: "William",
    ownerImageUri: require("../../assets/mypic.jpg"),
    id: 4,
  },
  {
    title: "Stapler",
    price: 10,
    quantity: 1,
    imageUri: require("../../assets/mypic.jpg"),
    backgroundColor: colors.white,
    ownerName: "William",
    ownerImageUri: require("../../assets/mypic.jpg"),
    id: 5,
  },
];

function HomeScreen({ navigation }) {
  const [refresh, onRefresh] = useState(false);
  const handleRefresh = () => {
    console.log("Refreshed");
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Feed</Text>
      </View>
      <FlatList
        data={items}
        refreshing={refresh}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FeedItem
            key={item.id}
            title={item.title}
            imageUri={item.imageUri}
            onItemPress={() =>
              navigation.navigate("ItemDetails", {
                ...item,
                withTradeButton: true,
              })
            }
            backgroundColor={item.backgroundColor}
            ownerName={item.ownerName}
            ownerImageUri={item.ownerImageUri}
          />
        )}
      ></FlatList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
