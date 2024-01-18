const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sqlite/conference.db",
});

const Autor = sequelize.define("autor", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

const Organizator = sequelize.define("organizator", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

const Reviewer = sequelize.define("reviewer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

const Articol = sequelize.define("articol", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
  feedback: {
    type: Sequelize.TEXT,
  },
});

const Conferinta = sequelize.define("conferinta", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume: {
    type: Sequelize.STRING,
  },
  descriere: {
    type: Sequelize.TEXT,
  },
});

Autor.hasMany(Articol);
Conferinta.hasMany(Articol);
Conferinta.hasMany(Autor);
Conferinta.hasMany(Reviewer);
Organizator.hasMany(Conferinta);
Reviewer.belongsToMany(Articol, { through: "reviewArticles" });
Articol.belongsToMany(Reviewer, { through: "reviewArticles" });

module.exports = {
  sequelize,
  Autor,
  Organizator,
  Reviewer,
  Articol,
  Conferinta,
};
