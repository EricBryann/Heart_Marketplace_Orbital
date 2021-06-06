const express = require("express");
const productsRoutes = require("./routes/products-routes");

const app = express();

app.use("/api/products", productsRoutes);

app.use((req, res, next) => {
  res.json({ message: "Hi" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Connecting to server 5000");
});
