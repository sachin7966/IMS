const router = require("express").Router();

const { Products } = require("./productTable");

const getAllProducts = async (req, res) => {
  const products = await Products.findAll({});
  res.json(products);
};

const getProduct = async (req, res) => {
  const id = req.params.prodId;
  const product = await Products.findByPk(id);
  res.send(product);
};

const saveProduct = async (req, res) => {
  const data = req.body;
  const newCreatedProduct = await Products.create(data);
  res.json(newCreatedProduct);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedCount = await Products.destroy({ where: { id: id } });
  res.json(deletedCount);
};

const updateProduct = async (req, res) => {
  const data = req.body;
  const updateObject = { ...data };
  delete updateObject.id;
  const updatedCount = await Products.update(updateObject, {
    where: { id: data.id },
  });
  res.json(updatedCount);
};

const login = (req, res) => {
  const data = req.body;
  if (data.username === "admin" && data.password === "admin") {
    res.json({ token: "thisismytoken" });
  } else {
    res.status(401).sent("Invalid Credintail");
  }
};

router.post("/auth/login", login);

router.get("/products", getAllProducts);
router.get("/products/:prodId", getProduct);
router.post("/products", saveProduct);

router.delete("/products/:id", deleteProduct);
router.put("/products", updateProduct);

module.exports = router;
