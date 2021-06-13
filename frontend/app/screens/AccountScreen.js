import React, { useContext, useState } from "react";
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
import { getProducts } from "../Auth/Auth";
import { Ionicons } from "@expo/vector-icons";
import CardItem from "../components/CardItem";
import firebase from "firebase";

const products = getProducts();

function AccountScreen({ navigation }) {
  const [refresh, onRefresh] = useState(false);
  const [productsPosted, setProductPosted] = useState([]);

  const handleRefresh = () => {
    console.log("refresh");
  };

  const Authentication = useContext(Auth);
  var id = 1;

  for (var i = 0; i < products.length; i ++) {
    if (products[i].ownerName === Authentication.user.displayName) {
      productsPosted.push({
        imageUri: products[i].imageUri,
        title: products[i].title,
        price: products[i].price,
        id: id,
        description: products[i].description,
        quantity: products[i].quantity
      });
      id ++;
    }
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.menuTitle}>
          <Text style={styles.title}>Heart Marketplace</Text>
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
