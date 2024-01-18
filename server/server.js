const express = require("express");
const cors = require("cors");

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sqlite/conference.db",
});

const Autor = sequelize.define("autor",{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName:{
    type: Sequelize.STRING,
  },
  username:{
    type: Sequelize.STRING,
  },
  password:{
    type: Sequelize.STRING,
  },
});

const Organizator = sequelize.define("organizator",{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName:{
    type: Sequelize.STRING,
  },
  username:{
    type: Sequelize.STRING,
  },
  password:{
    type: Sequelize.STRING,
  },
});

const Reviewer = sequelize.define("reviewer",{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName:{
    type: Sequelize.STRING,
  },
  username:{
    type: Sequelize.STRING,
  },
  password:{
    type: Sequelize.STRING,
  },
});

const Articol = sequelize.define("articol", {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title:{
    type: Sequelize.STRING,
  },
  body:{
    type: Sequelize.TEXT,
  },
  status:{
    type: Sequelize.BOOLEAN,
  },
  feedback:{
    type: Sequelize.TEXT,
  },
});

const Conferinta = sequelize.define("conferinta", {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume:{
    type: Sequelize.STRING,
  },
  descriere:{
    type: Sequelize.TEXT,
  },
});

Autor.hasMany(Articol);
Conferinta.hasMany(Articol);
Conferinta.hasMany(Autor);
Conferinta.hasMany(Reviewer);
Organizator.hasMany(Conferinta);
Reviewer.belongsToMany(Articol,{through:'reviewArticles'});
Articol.belongsToMany(Reviewer,{through:'reviewArticles'});


const app = express();
app.use(cors());
app.use(express.json());


app.get("/sync", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    // const sampleData = [
    //   {
    //     username: "first-user",
    //     fullName: "john doe",
    //     type: "regular-user",
    //   },
    //   {
    //     username: "second-user",
    //     fullName: "jane doe",
    //     type: "regular-user",
    //   },
    //   {
    //     username: "third-user",
    //     fullName: "alice doe",
    //     type: "power-user",
    //   },
    // ];
    // for (const item of sampleData) {
    //   const user = new User(item);
    //   await user.save();
    // }

    res.status(201).json({ message: "conference db created" });
  } catch (err) {
    next(err);
  }
});
/*** Requesturi
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
*/

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "server error" });
});

app.listen(8080, () => {
  console.log("The server is listening!");
});
