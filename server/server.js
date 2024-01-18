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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
        password,
      },
    });

    if (user) {
      res.json({ profile: { role: user.role } });
    } else {
      res.status(401).json({ error: 'Autentificare eșuată' });
    }
  } catch (error) {
    console.error('Eroare la autentificare:', error.message);
    res.status(500).json({ error: 'Eroare internă a serverului' });
  }
});

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "server error" });
});


app.listen(8080, () => {
  console.log("The server is listening!");
});

