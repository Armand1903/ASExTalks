const express = require("express");
const router = express.Router();

const { Organizator, Autor, Reviewer, Conferinta, Articol } = require("../models");

const autor = require("./autorRouter");
const articol = require("./articolRouter");
const conferinta = require("./conferintaRouter");
const organizator = require("./organizatorRouter");
const reviewer = require("./reviewerRouter");

// Define routes for autor
router.post("/autors", autor.createAutor);
router.get("/autors", autor.getAutors);
router.get("/autors/:id", autor.getAutor);
router.get("/autors/:username", autor.getAutorByUsername);
router.put("/autors/:id", autor.updateAutor);
router.delete("/autors/:id", autor.deleteAutor);

// Define routes for articol
router.post("/articles", articol.createArticol);
router.get("/articles", articol.getArticols);
router.get("/articles/:id", articol.getArticol);
router.put("/articles/:id", articol.updateArticol);
router.delete("/articles/:id", articol.deleteArticol);

// Define routes for conferinta
router.post("/conferintes", conferinta.createConferinta);
router.get("/conferintes", conferinta.getConferinte);
router.get("/conferintes/:id", conferinta.getConferinta);
router.put("/conferintes/:id", conferinta.updateConferinta);
router.delete("/conferintes/:id", conferinta.deleteConferinta);

// Define routes for organizator
router.post("/organizers", organizator.createOrganizator);
router.get("/organizers", organizator.getOrganizatori);
router.get("/organizers/:id", organizator.getOrganizator);
router.put("/organizers/:id", organizator.updateOrganizator);
router.delete("/organizers/:id", organizator.deleteOrganizator);

// Define routes for reviewer
router.post("/reviewers", reviewer.createReviewer);
router.get("/reviewers", reviewer.getRevieweri);
router.get("/reviewers/:id", reviewer.getReviewer);
router.put("/reviewers/:id", reviewer.updateReviewer);
router.delete("/reviewers/:id", reviewer.deleteReviewer);

//complex routes
router.get("/organizers/:id/allConferinte", async (req, res) => {
  try {
    const organizer = await Organizator.findByPk(req.params.id);

    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }

    const conferences = await Conferinta.findAll({ where: { organizatorId: req.params.id } });

    res.status(200).json({ conferences });
  } catch (error) {
    console.error("Error fetching conferences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all articles from conference
router.get("/conferintes/:id/allArticles", async (req, res) => {
  try {
    const conference = await Conferinta.findByPk(req.params.id);

    if (!conference) {
      return res.status(404).json({ error: "Conferinta not found" });
    }

    const articles = await Articol.findAll({ where: { conferintumId: req.params.id } });

    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/organizers/:id/allConferinte/allArticles", async (req, res) => {
  try {
    const organizerId = Number(req.params.id);

    const organizer = await Organizator.findByPk(organizerId);

    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }

    const conferences = await Conferinta.findAll({
      where: { organizatorId: organizerId },
    });

    // Extract conference IDs
    const conferenceIds = conferences.map((conference) => conference.id);

    // Fetch articles associated with the conferences
    const articles = await Articol.findAll({
      where: { conferintumId: conferenceIds },
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
