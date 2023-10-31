import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts",cartsRouter); // revisar

app.listen(PORT, ()=> console.log("server ok on port: " + PORT));




