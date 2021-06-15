import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/SubmitButton";
import * as ImagePicker from "expo-image-picker";
import ImageInput from "../components/ImageInput";
import colors from "../config/colors";
import { auth } from "../api/firebase";
import { Auth } from "../Auth/Auth";
import firebase from "firebase";

function SignUpScreen() {
  
  const [imageUri, changeUri] = useState();
  const Authentication = useContext(Auth);

  const signUp = async (user) => {
    try {
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      const currentUser = auth.currentUser;
      await currentUser.updateProfile({
        displayName: user.name,
        // photoURL: user.imageUri,
        // username: user.username,
      });
      Authentication.setUser({
        name: currentUser.displayName,
        username: user.username,
        email: currentUser.email,
        photoURL: user.imageUri,
      });
      console.log(currentUser);
      try {
        const newReference = firebase.database().ref('/Users').push();
        newReference
        .set({
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password
        })
        .then(() => {
          var query = firebase.database().ref().child("/Users").orderByChild("email").equalTo(Authentication.user.email);
          query.once("value", function(snapshot) {
            snapshot.forEach(function(child) {
              const followingset = firebase.database().ref("/Users/" + child.key + "/Followings").push();
              followingset
                .set({
                  fl: "null"
                })
                .then(() => {
                  console.log("Data updated.");
                });
                const followerset = firebase.database().ref("/Users/" + child.key + "/Followers").push();
                followerset
                  .set({
                    fl: "null"
                  })
                  .then(() => {
                    console.log("Data updated.");
                  });
              });
          });
  
          console.log('Data updated.');
        });
      } catch (error) {
        alert(error);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handlePress = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!res.cancelled) changeUri(res.uri);
    } catch (error) {
      console.log("Error reading the image", error);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
  });

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            imageUri: "",
            name: "",
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            signUp(values);
          }}
          validationSchema={validationSchema}
        >
          <View style={styles.image}>
            <ImageInput imageUri={imageUri} onPress={handlePress} />
          </View>
          <AppFormField name="name" iconName="account" placeholderName="Name" />
          <AppFormField
            name="username"
            iconName="account"
            placeholderName="Username"
          />
          <AppFormField name="email" iconName="email" placeholder="Email" />
          <AppFormField
            name="password"
            iconName="lock"
            placeholderName="Password"
            secureTextEntry
          />

          <View style={styles.button}>
            <SubmitButton title="Sign Up" />
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    marginVertical: 20,
  },
});

export default SignUpScreen;
