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

const fs = require('fs');

// app.post('/data', async (req, res) => {
//   try {
//     const jsonData = fs.readFileSync('data.json');
//     const data = JSON.parse(jsonData);

//     // Sync all models to create the tables if they don't exist
//     await sequelize.sync();

//     // Insert data into the Autor table
//     const autorIds = await Autor.bulkCreate(data.autors, { returning: ['id'] });
//     const autorIdMap = autorIds.reduce((acc, autor, index) => {
//       acc[`Author ${index + 1}`] = autor.id;
//       return acc;
//     }, {});

//     // Insert data into the Organizator table
//     await Organizator.bulkCreate(data.organizators);

//     // Insert data into the Reviewer table
//     await Reviewer.bulkCreate(data.reviewers);

//     // Insert data into the Articol table
//     await Articol.bulkCreate(data.articols);

//     // Insert data into the Conferinta table
//     const conferintaIds = await Conferinta.bulkCreate(data.conferintas, { returning: ['id'] });

//     // Associate Autors and Reviewers with Conferintas
//     for (let i = 0; i < data.conferintas.length; i++) {
//       const conferinta = data.conferintas[i];
//       const conferintaId = conferintaIds[i].id;

//       // Associate Autors
//       await Conferinta.update(
//         { autors: conferinta.autors.map(author => autorIdMap[`Author ${author}`]) },
//         { where: { id: conferintaId } }
//       );

//       // Associate Reviewers
//       await Conferinta.update(
//         { reviewers: conferinta.reviewers },
//         { where: { id: conferintaId } }
//       );
//     }

//     res.status(200).json({ message: 'Data inserted into the database' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/sync", async (req, res, next) => {
//   try {
//     await sequelize.sync({ force: true });
//     res.status(201).json({ message: "conference db created" });
//   } catch (err) {
//     next(err);
//   }
// });

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
