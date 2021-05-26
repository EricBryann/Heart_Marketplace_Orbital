import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import ListItem from "../components/list/ListItem";
import { Auth } from "../Auth/Auth";
import { auth } from "../api/firebase";

function AccountScreen(props) {
  const Authentication = useContext(Auth);
  const logout = () => {
    Authentication.setUser();
    auth.signOut();
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.profile}>
        <ListItem
          title={Authentication.user.name}
          subTitle={Authentication.user.email}
          imageUri={require("../../assets/mypic.jpg")}
          // imageUri={Authentication.user.photoURL}
          backgroundColor={colors.lightgrey}
        />
      </View>
      <View></View>
      <View style={styles.logout}>
        <ListItem
          title="Log Out"
          iconName="logout"
          backgroundColor="#ffe66d"
          onPress={logout}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  profile: {
    marginVertical: 20,
  },
  logout: {
    marginVertical: 20,
  },
});

export default AccountScreen;
