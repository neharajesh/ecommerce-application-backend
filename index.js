const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config();

const {initializeDbConnection} = require("./db/db-setup")
initializeDbConnection();

const app = express();
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT;

const productRouter = require("./routers/product-router")
const cartRouter = require("./routers/cart-router")
const categoryRouter = require("./routers/category-router")
const offersRouter = require("./routers/offers-router")
const wishlistRouter = require("./routers/wishlist-router")

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/offers", offersRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

app.get("/", (req, res) => {
  res.send("Home page")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})