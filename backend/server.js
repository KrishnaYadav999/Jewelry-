const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Constants
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// CORS setup - allow frontend origin and credentials
app.use(
  cors({
    origin: "https://jewelry-frontend.vercel.app", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
  next();
});

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true only in production (HTTPS)
      httpOnly: true,
      maxAge: 1000 * 60 * 15, // 15 minutes
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-domain cookies in prod
    },
  })
);

// Import Routes
const otpRoutes = require("./routes/otpRoutes");
const blogRoutes = require("./routes/blogRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/userRoutes");
const mangalsutraRoutes = require("./routes/mangalsutra");
const braceletRoutes = require("./routes/braceletRoutes");
const bangleRoutes = require("./routes/bangleRoutes");
const earringRoutes = require("./routes/earringRoutes");
const ringRoutes = require("./routes/ringRoutes");
const pendantSetRoutes = require("./routes/pendantSetRoutes");
const necklaceSetRoutes = require("./routes/necklaceSetRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewsRoutes = require("./routes/reviews");
const paymentRoutes = require("./routes/paymentRoutes");

const { chatWithGemini } = require("./controllers/chatController");

// Chatbot route handled here
app.post("/api/chatbot/chat", chatWithGemini);

// Attach the routes
app.use("/api/reviews", reviewsRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mangalsutras", mangalsutraRoutes);
app.use("/api/bracelets", braceletRoutes);
app.use("/api/bangles", bangleRoutes);
app.use("/api/earrings", earringRoutes);
app.use("/api/rings", ringRoutes);
app.use("/api/pendantsets", pendantSetRoutes);
app.use("/api/necklacesets", necklaceSetRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/blogs", blogRoutes);

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
