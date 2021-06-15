import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

function AuthScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/ads.png")} style={styles.logo} />
        <Text style={styles.text}>Ad-plication</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        <AppButton
          title="Sign Up"
          onPress={() => navigation.navigate("Sign Up")}
          color={colors.secondary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.white,
  },
  buttonContainer: {
    padding: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Roboto",
  },
});

export default AuthScreen;
