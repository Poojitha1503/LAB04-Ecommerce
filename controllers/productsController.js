let products = require("../data/products");

exports.getAllProducts = (req, res) => {
  let { page = 1, limit = 5, name } = req.query;

  let filtered = products;

  if (name) {
    filtered = products.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);

  res.json(filtered.slice(start, end));
};
//get single product
exports.getProductById = (req, res) => {
    const product = products.find(p => p.id == req.params.id);
  
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    res.json(product);
  };
// Create Product
exports.createProduct = (req, res) => {
    const { name, price } = req.body;
  
    const newProduct = {
      id: products.length + 1,
      name,
      price
    };
  
    products.push(newProduct);
  
    res.status(201).json(newProduct);
  };
  // Update Product
  exports.updateProduct = (req, res) => {
    const product = products.find(p => p.id == req.params.id);
  
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }
  
    const { name, price } = req.body;
  
    if (name) product.name = name;
    if (price) product.price = price;
  
    res.json(product);
  };
// Delete Product
exports.deleteProduct = (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: "Product deleted" });
  };