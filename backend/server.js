import express from "express";
import cors from "cors";
import dbsetup from "./config/db.js";
import categoryroute from "./routes/categoryRoutes.js";
import productroute from "./routes/productRoutes.js";

async function startserver() {

    const db = await dbsetup();

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.locals.db = db;

    // app.get("/", (req, res) => {
    //     res.send("server is running");
    // });

    app.use("/api/category", categoryroute);
    app.use("/api/product", productroute);

    app.listen(3000, () => {
        console.log("server is running http://localhost:3000");
    });
}

startserver();
