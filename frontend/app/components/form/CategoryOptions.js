import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

function CategoryOptions({ title, iconName, onSelect, selectedItem }) {
  const categories = [
    {
      backgroundColor: "#fc5c65",
      icon: "account-heart",
      title: "Volunteer",
      id: 1,
    },
    {
      backgroundColor: "#fd9644",
      icon: "bag-checked",
      title: "Jobs",
      id: 2,
    },
    {
      backgroundColor: "#fed330",
      icon: "basketball",
      title: "Sold items",
      id: 3,
    },
    {
      backgroundColor: "#26de81",
      icon: "cash",
      title: "Donation",
      id: 4,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "tshirt-crew",
      title: "Second-hand",
      id: 5,
    },

    {
      backgroundColor: "#778ca3",
      icon: "application",
      title: "Other",
      id: 6,
    },
  ];
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.container}>
          {selectedItem ? (
            <Text style={[styles.text, { color: colors.black }]}>
              {selectedItem}
            </Text>
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
          <MaterialCommunityIcons name={iconName} size={25} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={showModal} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <Text style={styles.modalText}>Close</Text>
        </TouchableWithoutFeedback>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            keyExtractor={(category) => category.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowModal(false);
                  onSelect(item);
                }}
              >
                <View style={styles.category}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={100}
                    color={item.backgroundColor}
                  ></MaterialCommunityIcons>
                  <Text>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: colors.lightgrey,
    padding: 15,
    alignItems: "center",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    color: colors.grey,
    flex: 1,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
    backgroundColor: colors.primary,
  },
  category: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  categoriesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryOptions;
