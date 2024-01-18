const { Organizator } = require("../models");

// CRUD commands
const createOrganizator = async (req, res, next) => {
  try {
    const organizator = await Organizator.create(req.body);
    res.status(201).json(organizator);
  } catch (err) {
    next(err);
  }
};

const getOrganizatori = async (req, res, next) => {
  try {
    const organizatori = await Organizator.findAll();
    res.status(200).json(organizatori);
  } catch (err) {
    next(err);
  }
};

const getOrganizator = async (req, res, next) => {
  try {
    const organizator = await Organizator.findByPk(req.params.id);
    if (organizator) {
      res.status(200).json(organizator);
    } else {
      res.status(404).json({ message: "Organizator not found" });
    }
  } catch (err) {
    next(err);
  }
};

const updateOrganizator = async (req, res, next) => {
  try {
    const organizator = await Organizator.findByPk(req.params.id);
    if (organizator) {
      await organizator.update(req.body);
      res.status(200).json(organizator);
    } else {
      res.status(404).json({ message: "Organizator not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteOrganizator = async (req, res, next) => {
  try {
    const organizator = await Organizator.findByPk(req.params.id);
    if (organizator) {
      await organizator.destroy();
      res.status(200).json({ message: "Organizator deleted" });
    } else {
      res.status(404).json({ message: "Organizator not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrganizator,
  getOrganizatori,
  getOrganizator,
  updateOrganizator,
  deleteOrganizator,
};
