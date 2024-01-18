const { Conferinta } = require("../models");

// CRUD commands
const createConferinta = async (req, res, next) => {
  try {
    const conferinta = await Conferinta.create(req.body);
    res.status(201).json(conferinta);
  } catch (err) {
    next(err);
  }
};

const getConferinte = async (req, res, next) => {
  try {
    const conferinte = await Conferinta.findAll();
    res.status(200).json(conferinte);
  } catch (err) {
    next(err);
  }
};

const getConferinta = async (req, res, next) => {
  try {
    const conferinta = await Conferinta.findByPk(req.params.id);
    if (conferinta) {
      res.status(200).json(conferinta);
    } else {
      res.status(404).json({ message: "Conferinta not found" });
    }
  } catch (err) {
    next(err);
  }
};

const updateConferinta = async (req, res, next) => {
  try {
    const conferinta = await Conferinta.findByPk(req.params.id);
    if (conferinta) {
      await conferinta.update(req.body);
      res.status(200).json(conferinta);
    } else {
      res.status(404).json({ message: "Conferinta not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteConferinta = async (req, res, next) => {
  try {
    const conferinta = await Conferinta.findByPk(req.params.id);
    if (conferinta) {
      await conferinta.destroy();
      res.status(200).json({ message: "Conferinta deleted" });
    } else {
      res.status(404).json({ message: "Conferinta not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createConferinta,
  getConferinte,
  getConferinta,
  updateConferinta,
  deleteConferinta,
};
