const { Articol } = require("../models");

// CRUD commands
const createArticol = async (req, res, next) => {
  try {
    const articol = await Articol.create(req.body);
    res.status(201).json(articol);
  } catch (err) {
    next(err);
  }
};

const getArticols = async (req, res, next) => {
  try {
    const articole = await Articol.findAll();
    res.status(200).json(articole);
  } catch (err) {
    next(err);
  }
};

const getArticol = async (req, res, next) => {
  try {
    const articol = await Articol.findByPk(req.params.id);
    if (articol) {
      res.status(200).json(articol);
    } else {
      res.status(404).json({ message: "Articol not found" });
    }
  } catch (err) {
    next(err);
  }
};

const updateArticol = async (req, res, next) => {
  try {
    const articol = await Articol.findByPk(req.params.id);
    if (articol) {
      await articol.update(req.body);
      res.status(200).json(articol);
    } else {
      res.status(404).json({ message: "Articol not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteArticol = async (req, res, next) => {
  try {
    const articol = await Articol.findByPk(req.params.id);
    if (articol) {
      await articol.destroy();
      res.status(200).json({ message: "Articol deleted" });
    } else {
      res.status(404).json({ message: "Articol not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createArticol,
  getArticols,
  getArticol,
  updateArticol,
  deleteArticol,
};
