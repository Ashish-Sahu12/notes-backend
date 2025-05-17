import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import ConnectionWithDb from "./config.js";
import router from "./router/User.router.js";
import NoteRouter from "./router/addNotes.routes.js";

configDotenv(); // Load environment variables

const app = express();

// ✅ CORS Configuration to allow frontend with credentials
const corsOptions = {
  origin: "http://localhost:5173", // frontend origin
  credentials: true,              // allow cookies, authorization headers, etc.
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

// ✅ Middleware
app.use(express.json()); // parse JSON requests

// ✅ Database connection
ConnectionWithDb();

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ data: "Hello backend server!" });
});

// ✅ Routes
app.use("/users", router);     // You can change the path as needed
app.use("/notes", NoteRouter); // You can change the path as needed

// ✅ Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
