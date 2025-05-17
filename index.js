import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import ConnectionWithDb from "./config.js";
import router from "./router/User.router.js";
import NoteRouter from "./router/addNotes.routes.js";

// ✅ Load environment variables
configDotenv();

// ✅ Initialize Express app
const app = express();

// ✅ CORS Configuration (No trailing slash in origin!)
const corsOptions = {
  origin: "https://notes-frontend-blond.vercel.app", // ✅ CORRECTED: removed trailing slash
  credentials: true, // ✅ Required for cookies, sessions, etc.
};
app.use(cors(corsOptions));

// ✅ Handle preflight requests
app.options("*", cors(corsOptions));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to MongoDB
ConnectionWithDb();

// ✅ Basic test route
app.get("/", (req, res) => {
  res.json({ data: "Hello backend server!" });
});

// ✅ User routes
app.use("/users", router);

// ✅ Notes routes
app.use("/notes", NoteRouter);

// ✅ Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
