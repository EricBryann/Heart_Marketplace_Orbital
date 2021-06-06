const getProducts = async (req, res, next) => {
  const products = [
    {
      title: "Bottle",
    },
  ];
  res.json({ products: products });
};

const uploadProduct = async (req, res, next) => {};
const updateProduct = async (req, res, next) => {};
const deleteProduct = async (req, res, next) => {};

exports.getProducts = getProducts;
