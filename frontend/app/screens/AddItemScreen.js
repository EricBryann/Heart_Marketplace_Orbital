import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppForm from "../components/form/AppForm";
import Screen from "../components/Screen";
import SubmitButton from "../components/SubmitButton";
import AppFormImageField from "../components/form/AppFormImageField";
import colors from "../config/colors";
import CategoryOptionsField from "../components/form/CategoryOptionsField";

function AddItemScreen(props) {
  const validationSchema = Yup.object().shape({
    images: Yup.array().min(1, "Please select at least 1 image"),
    title: Yup.string().required().min(1).label("Title"),
    quantity: Yup.number().positive().required().label("Quantity"),
    minPrice: Yup.number().positive().required().label("Price"),
    category: Yup.string().required().nullable().label("Category"),
    description: Yup.string().label("Description"),
  });
  return (
    <Screen>
      <ScrollView style={styles.container}>
        <AppForm
          initialValues={{
            images: [],
            title: "",
            quantity: "",
            price: "",
            category: "",
            description: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormImageField name="images" />
          <AppFormField name="title" placeholderName="Title" />
          <AppFormField
            keyboardType="numeric"
            name="quantity"
            placeholderName="Quantity"
            width="50%"
          />
          <AppFormField
            keyboardType="numeric"
            name="price"
            placeholderName="Price"
            width="50%"
          />
          <CategoryOptionsField
            title="Category"
            iconName="chevron-down"
            name="category"
          />
          <AppFormField
            name="description"
            placeholderName="Description"
            multiline
            numberOfLines={5}
          />
          <View style={styles.button}>
            <SubmitButton title="Add Item" />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  button: {
    marginVertical: 20,
  },
});

export default AddItemScreen;
