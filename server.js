const express = require("express");
const app = express();

const { logger } = require("./middleware/logger"); // import middleware
const productRoutes = require("./routes/products");

// middleware
app.use(express.json());
app.use(logger);

// routes
app.use("/products", productRoutes);

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});