import express from "express";
import userRoutes from "./routes/user.route";
import addressRoutes from "./routes/address.route";
import authMiddleware from "./middleware/auth.middleware";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/addresses", authMiddleware, addressRoutes);

setupSwagger(app);

app.get("/", (_, res) => {
  res.send("Welcome to the Liven User-Address API!");
});

export default app;
