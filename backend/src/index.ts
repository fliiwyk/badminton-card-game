import express from "express";
import cors from "cors";
import matchRoutes from "./routes/matchRoutes";

const app = express();
const PORT = 5000;

app.use(cors()); // 👈 autorise toutes les origines
app.use(express.json());

// 👇 toutes les routes du fichier matchRoutes seront accessibles sous /api
app.use("/api", matchRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend lancé sur http://localhost:${PORT}`);
});
