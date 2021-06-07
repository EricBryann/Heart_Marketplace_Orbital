import { createContext } from "react";
import firebase from "firebase";


const Auth = createContext();

const getProducts = () => {
  const initialValue = [];
  var id = 1;

  var products = firebase.database().ref('/Products');
  products.on('value', (snapshot) => {
    snapshot.forEach(snap => {
      initialValue.push({
        imageUri: require("../../assets/mypic.jpg"),
        title: snap.val().title,
        quantity: snap.val().quantity,
        price: snap.val().price,
        id: id,
        description: snap.val().description,
        ownerName: snap.val().uploader,
        ownerImageUri: require("../../assets/mypic.jpg"),
        tags: snap.val().category
      });
      id ++;
    });
  });

  return initialValue;
};

const getUsers = () => {
  const initialValue = [];

  var products = firebase.database().ref('/Users');
  products.on('value', (snapshot) => {
    snapshot.forEach(snap => {
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

export { Auth, getProducts, getUsers };
