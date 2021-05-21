import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ImageInputList from "../ImageInputList";
import ErrorText from "./ErrorText";
import { useFormikContext } from "formik";
import * as ImagePicker from "expo-image-picker";

function AppFormImageField({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const onRemoveImage = (uri) => {
    console.log(uri);
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };
  const onAddImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!res.cancelled) {
        setFieldValue(name, [...imageUris, res.uri]);
      }
    } catch (error) {
      console.log("Error reading the image", error);
    }
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onRemoveImage={onRemoveImage}
        onAddImage={onAddImage}
      />
      <ErrorText error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFormImageField;
