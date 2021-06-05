import React, {useContext} from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppForm from "../components/form/AppForm";
import Screen from "../components/Screen";
import AppFormImageField from "../components/form/AppFormImageField";
import colors from "../config/colors";
import CategoryOptionsField from "../components/form/CategoryOptionsField";
import firebase from "firebase";
import { Auth } from "../Auth/Auth";
import { useFormikContext } from "formik";
import SubmitButton from "../components/SubmitButton";


function AddItemScreen(props) {
  const validationSchema = Yup.object().shape({
    images: Yup.array().min(1, "Please select at least 1 image"),
    title: Yup.string().required().min(1).label("Title"),
    quantity: Yup.number().positive().required().label("Quantity"),
    price: Yup.number().positive().required().label("Price"),
    category: Yup.string().required().nullable().label("Category"),
    description: Yup.string().label("Description"),
  });

  const Authentication = useContext(Auth);

  const handleValues = async ({images,title,quantity,price,category,description}) => {
    try {
      const newReference = firebase.database().ref('/Products').push();
      newReference
      .set({
        images: images,
        title: title,
        quantity: quantity,
        price: price,
        category: category,
        description: description,
        uploader: Authentication.user.displayName
      })
      .then(() => console.log('Data updated.'));
    } catch (error) {
      alert(error);
    }
  };

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
            description: ""
          }}
          onSubmit={(values) => {
            handleValues(values);
          }}
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
            <SubmitButton title="Add Item"/>
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
