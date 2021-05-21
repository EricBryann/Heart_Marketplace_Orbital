import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorText from "./ErrorText";
import CategoryOptions from "./CategoryOptions";

function CategoryOptionsField({ name, title, iconName }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const onSelect = ({ title }) => {
    setFieldValue(name, title);
  };

  return (
    <>
      <CategoryOptions
        title={title}
        iconName={iconName}
        selectedItem={values[name]}
        onSelect={onSelect}
      />
      <ErrorText error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CategoryOptionsField;
