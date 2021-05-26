import { createContext } from "react";

const Auth = createContext();

const getProducts = () => {
  return [
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Book",
      quantity: 1,
      price: 10,
      id: 1,
      description: "A good book",
    },
    {
      imageUri: "",
      title: "Bottle",
      quantity: 1,
      price: 20,
      id: 2,
      description: "A good bottle",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Bag",
      quantity: 1,
      price: 50,
      id: 3,
      description: "A good bag",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Calculator",
      quantity: 1,
      price: 50,
      id: 4,
      description: "A good calculator",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Wallet",
      quantity: 1,
      price: 50,
      id: 5,
      description: "A good wallet",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Bowl",
      quantity: 1,
      price: 50,
      id: 6,
      description: "A good bowl",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Pants",
      quantity: 1,
      price: 50,
      id: 7,
      description: "A good pants",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Shirt",
      quantity: 1,
      price: 50,
      id: 8,
      description: "A good shirt",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Swimming trunks",
      quantity: 1,
      price: 50,
      id: 9,
      description: "A good trunks",
    },
    {
      imageUri: require("../../assets/mypic.jpg"),
      title: "Masks",
      quantity: 1,
      price: 50,
      id: 10,
      description: "A good masks",
    },
  ];
};

const getUsers = () => {
  return [
    {
      name: "Eric Bryan",
      username: "ericbryannn_",
      email: "eric.bryan2001@gmail.com",
      password: "ericbryan",
    },
    {
      name: "Testz",
      username: "testz",
      email: "testz@gmail.com",
      password: "testingz",
    },
  ];
};

export { Auth, getProducts, getUsers };
