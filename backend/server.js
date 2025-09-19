import express from "express";
import cors from "cors";
const app = express();
import { setupDatabase } from "./utils/db.js";
import playersRoutes from "./routes/players.js";
import partnersRoutes from "./routes/partners.js";
import adminRoutes from "./routes/admin.js";
await setupDatabase();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello this is the backend");
});

app.use("/api/players", playersRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/admin", adminRoutes);

app.listen(3000);
