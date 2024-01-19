const { Autor } = require("../models");

// CRUD commands
const createAutor = async (req, res, next) => {
  try {
    const autor = await Autor.create(req.body);
    res.status(201).json(autor);
  } catch (err) {
    next(err);
  }
};

const getAutors = async (req, res, next) => {
  try {
    const autores = await Autor.findAll();
    res.status(200).json(autores);
  } catch (err) {
    next(err);
  }
};

const getAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ message: "Autor not found" });
    }
  } catch (err) {
    next(err);
  }
};

const getAutorByUsername = async (req, res, next) => {
  try {
    const usernameAutor = re
    const autor = await Autor.findByPk(req.params.id);
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ message: "Autor not found" });
    }
  } catch (err) {
    next(err);
  }
};

const updateAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (autor) {
      await autor.update(req.body);
      res.status(200).json(autor);
    } else {
      res.status(404).json({ message: "Autor not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (autor) {
      await autor.destroy();
      res.status(200).json({ message: "Autor deleted" });
    } else {
      res.status(404).json({ message: "Autor not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAutor,
  getAutors,
  getAutor,
  getAutorByUsername,
  updateAutor,
  deleteAutor,
};
