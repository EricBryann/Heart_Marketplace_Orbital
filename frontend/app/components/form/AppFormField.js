import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import ErrorText from "./ErrorText";
import AppTextInput from "./AppTextInput";

function AppFormField({
  iconName,
  placeholderName,
  name,
  width,
  ...otherProps
}) {
  const { touched, setFieldTouched, handleChange, errors } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        style={styles.textInput}
        width={width}
        {...otherProps}
        placeholderName={placeholderName}
        iconName={iconName}
      />
      <ErrorText error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: "#000",
    fontSize: 18,
  },
});

export default AppFormField;
