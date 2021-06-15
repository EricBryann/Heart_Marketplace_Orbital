import { createContext } from "react";
import { Image } from "react-native";
import firebase from "firebase";
import defaultphoto from "../../assets/blank_pp.png";

const Auth = createContext();

const getProducts = () => {
  const initialValue = [];
  var id = 1;

  var products = firebase.database().ref("/Products");
  products.on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      firebase
        .storage()
        .ref("/" + snap.val().uploader + snap.val().title + "0")
        .getDownloadURL()
        .then((url) => {
          initialValue.push({
            imageUri: url,
            title: snap.val().title,
            quantity: snap.val().quantity,
            price: snap.val().price,
            id: id,
            description: snap.val().description,
            ownerName: snap.val().uploader,
            ownerImageUri: require("../../assets/blank_pp.png"),
            tags: snap.val().category.toLowerCase(),
          });
          id++;
        })
        .catch((e) => {
          const exampleImageUri = Image.resolveAssetSource(defaultphoto).uri;
          initialValue.push({
            imageUri: exampleImageUri,
            title: snap.val().title,
            quantity: snap.val().quantity,
            price: snap.val().price,
            id: id,
            description: snap.val().description,
            ownerName: snap.val().uploader,
            ownerImageUri: require("../../assets/blank_pp.png"),
            tags: snap.val().category,
          });
          id++;
        });
    });
  });

  return initialValue;
};

const getProductsByUser = (user, _callback) => {
  const temp = [];
  var ref = firebase.database().ref("/Products");
  var query = ref.orderByChild("uploader").equalTo(user.username);
  var id = 1;
  query.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      firebase
        .storage()
        .ref("/" + child.val().uploader + child.val().title + "0")
        .getDownloadURL()
        .then((url) => {
          temp.push({
            imageUri: url,
            title: child.val().title,
            price: child.val().price,
            id: id,
            description: child.val().description,
            quantity: child.val().quantity,
          });
        })
        .catch((e) => {
          const exampleImageUri = Image.resolveAssetSource(defaultphoto).uri;
          temp.push({
            imageUri: exampleImageUri,
            title: child.val().title,
            price: child.val().price,
            id: id,
            description: child.val().description,
            quantity: child.val().quantity,
          });
        });
      id++;
    });
  });
  _callback(temp);
};

const getUsers = () => {
  const initialValue = [];

  var products = firebase.database().ref("/Users");
  products.on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      initialValue.push({
        name: snap.val().name,
        username: snap.val().name,
        email: snap.val().email,
        password: snap.val().password,
      });
    });
  });

  return initialValue;
};

export { Auth, getProducts, getProductsByUser, getUsers };
