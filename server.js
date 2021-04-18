require("dotenv").config({ path: "./config.env" });
const express = require("express");

const connectDb = require("./configs/db");

const errorHandler = require("./middleware/error");

// connect Db
connectDb();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auths"));
app.use("/api/private", require("./routes/private"));

// Error handler should be last peice of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
