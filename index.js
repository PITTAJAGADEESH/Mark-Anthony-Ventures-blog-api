require("dotenv").config();

const express = require("express");
const { sequelize } = require("./models/models");
const router = require("./routes/routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database sync failed:", err));
