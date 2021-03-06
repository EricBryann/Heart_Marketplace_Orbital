import React, { useContext } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/SubmitButton";
import colors from "../config/colors";
import { Auth, getUsers } from "../Auth/Auth";
import { auth } from "../api/firebase";

function LoginScreen() {
  const Authentication = useContext(Auth);
  const login = async ({ email, password }) => {
    try {
      const currentUser = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      Authentication.setUser({
        displayName: currentUser.user.displayName,
        email: currentUser.user.email,
      });
    } catch (error) {
      alert(error);
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
  });

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Image
          style={styles.logo}
          source={require("../../assets/heartMarketplaceLogo.jpg")}
        />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            login(values);
          }}
          validationSchema={validationSchema}
        >
          <AppFormField name="email" iconName="email" placeholderName="Email" />
          <AppFormField
            name="password"
            iconName="lock"
            placeholderName="Password"
            secureTextEntry
          />
          <View style={styles.button}>
            <SubmitButton title="Login" />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    marginVertical: 20,
  },
});

export default LoginScreen;
