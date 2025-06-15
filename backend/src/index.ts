import express from "express";
import cors from "cors";
import gameRoutes from "./routes/game"; // 👈 le fichier que tu viens de créer

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ autorise les appels venant du frontend
  })
);
app.use(express.json());

app.use("/api/game", gameRoutes); // 👈 tes routes accessibles depuis le frontend

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
