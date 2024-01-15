const express = require("express");
const cors = require("cors");
// const jsonwebtoken = require("jsonwebtoken");

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sqlite/sample.db",
});

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.ENUM,
    values: ["organizer", "reviewer", "author"],
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/sync", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    const sampleData = [
      {
        username: "organizer",
        password: "abc123",
        role: "organizer",
      },
      {
        username: "reviewer",
        password: "abc123",
        role: "reviewer",
      },
      {
        username: "author",
        password: "abc123",
        role: "author",
      },
    ];
    for (const item of sampleData) {
      const user = new User(item);
      await user.save();
    }
    res.status(201).json({ message: "sample db created" });
  } catch (err) {
    next(err);
  }
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
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

//   app.post("/login", async (req, res) => {
  //   const { username, password } = req.body;
  
  //   try {
  //     const user = await User.findOne({
  //       where: {
  //         username,
  //         password,
  //       },
  //     });
  
  //     if (user) {
  //       const token = jwt.sign({ username: user.username, role: user.role }, "secret_key");      
  //       res.json({ token });
  //     } else {
  //       res.status(401).json({ error: 'Autentificare eșuată' });
  //     }
  //   } catch (error) {
  //     console.error('Eroare la autentificare:', error.message);
  //     res.status(500).json({ error: 'Eroare internă a serverului' });
  //   }
  // });

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "server error" });
});



app.listen(8080, () => {
  console.log("The server is listening!");
});



