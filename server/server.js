const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/mainRouter");

const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", mainRouter);

app.get("/sync", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });

    res.status(201).json({ message: "conference db created" });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "server error" });
});

app.listen(8080, () => {
  console.log("The server is listening!");
});
