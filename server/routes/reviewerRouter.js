const { Reviewer } = require("../models");

// CRUD commands
const createReviewer = async (req, res, next) => {
  try {
    const reviewer = await Reviewer.create(req.body);
    res.status(201).json(reviewer);
  } catch (err) {
    next(err);
  }
};

const getRevieweri = async (req, res, next) => {
  try {
    const revieweri = await Reviewer.findAll();
    res.status(200).json(revieweri);
  } catch (err) {
    next(err);
  }
};

const getReviewer = async (req, res, next) => {
  try {
    const reviewer = await Reviewer.findByPk(req.params.id);
    if (reviewer) {
      res.status(200).json(reviewer);
    } else {
      res.status(404).json({ message: "Reviewer not found" });
    }
  } catch (err) {
    next(err);
  }
};

const updateReviewer = async (req, res, next) => {
  try {
    const reviewer = await Reviewer.findByPk(req.params.id);
    if (reviewer) {
      await reviewer.update(req.body);
      res.status(200).json(reviewer);
    } else {
      res.status(404).json({ message: "Reviewer not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteReviewer = async (req, res, next) => {
  try {
    const reviewer = await Reviewer.findByPk(req.params.id);
    if (reviewer) {
      await reviewer.destroy();
      res.status(200).json({ message: "Reviewer deleted" });
    } else {
      res.status(404).json({ message: "Reviewer not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReviewer,
  getRevieweri,
  getReviewer,
  updateReviewer,
  deleteReviewer,
};
