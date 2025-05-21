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

// Enable CORS for frontend integration
app.use(
  cors({
    origin: '*',  // Allow all origins (for testing only)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
  next();
});

// Session Middleware for managing sessions securely
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret-key", // Secret key for signing session ID
    resave: false, // Prevents re-saving unchanged sessions
    saveUninitialized: false, // Do not save empty sessions
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/myDatabase", // MongoDB URI
      collectionName: "sessions", // Name of the MongoDB collection to store sessions
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
      httpOnly: true, // Prevent client-side access to cookies
      maxAge: 1000 * 60 * 15, // 15 minutes session expiry
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
// const chatbotRoutes = require("./routes/chatbotRoutes"); // Not needed as we handle chatbot directly in the controller
const paymentRoutes = require("./routes/paymentRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const { chatWithGemini } = require('./controllers/chatController');

// Chatbot route - handle chatbot requests directly in the server file
app.post('/api/chatbot/chat', chatWithGemini);

// Attach the routes to the API paths
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
// app.use("/api/chatbot", chatbotRoutes); // No need for this route anymore
app.use("/api/blogs", blogRoutes);

// Catch-all route for invalid paths
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
