const express = require("express");
const router = express.Router();

const autor = require("./autorRouter");
const articol = require("./articolRouter");
const conferinta = require("./conferintaRouter");
const organizator = require("./organizatorRouter");
const reviewer = require("./reviewerRouter");
const { Autor, Reviewer } = require("../models");

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

//Complex routes
  router.get('/freeReviewers', async (req, res) => {
    try {
      // Find reviewers where conferenceId is NULL
      const reviewersWithoutConference = await Reviewer.findAll({
        where: {
            conferintumId: 2,
        },
      });
  
      if (reviewersWithoutConference.length === 0) {
        return res.status(404).json({ error: 'No reviewers found without conferences' });
      }
  
      res.status(200).json(reviewersWithoutConference);
    } catch (error) {
      console.error('Error fetching reviewers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  

module.exports = router;
