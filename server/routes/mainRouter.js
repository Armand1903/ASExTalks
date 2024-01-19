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

router.get('/freeReviewers', async (req, res) => {
    try {
      // Find reviewers where conferenceId is NULL
      const reviewersWithoutConference = await Reviewer.findAll({
        where: {
            conferintumId: null,
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

  router.put("/reviewers/:id", async (req, res) => {
    const { id } = req.params;
    const { conferintumId } = req.body;
  
    try {
      const reviewer = await Reviewer.findByPk(id);
  
      if (!reviewer) {
        return res.status(404).json({ error: "Reviewer not found" });
      }
  
      // Actualizează conferintumId pentru recenzor
      reviewer.conferintumId = conferintumId;
      await reviewer.save();
  
      res.status(200).json(reviewer);
    } catch (error) {
      console.error("Error updating reviewer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



  //functia pentru alocare automata a 2 revieweri
  // exemplu de body {"reviewerIds": [1, 5]}
  router.post("/articol/:idArticol/allocateReviewers", async (req, res) => {
    try {
      const idArticol = req.params.idArticol;
      const reviewerIds = req.body.reviewerIds; // Assuming reviewerIds is an array in the request body
  
      const articol = await Articol.findByPk(idArticol);
  
      if (!articol) {
        return res.status(404).json({ error: 'Articolul cu id ul selectat nu a fost gasit' });
      }
  
      // Check if the array contains exactly 2 reviewer IDs
      if (!Array.isArray(reviewerIds) || reviewerIds.length !== 2) {
        return res.status(400).json({ error: 'Please provide exactly 2 reviewer IDs' });
      }
  
      // Use the method addReviewers to associate reviewers with the article
      await articol.addReviewers(reviewerIds);
  
      res.status(200).json({ message: 'Reviewers added to the article successfully' });
    } catch (error) {
      console.error('Error updating reviewers for the article:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.put("/reviewer/:id/feedback&status", async (req, res) => {
    try{


    }catch (error) {
      console.error('Error updating feedback and status for the article:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get("/reviewer/:idReviewer/getArticles", async (req, res) => {
    try {
      const idReview = req.params.idReviewer;
      const reviewer = await Reviewer.findByPk(idReview); // Added 'await' to ensure the Promise is resolved
      if(!reviewer){
        return res.status(400).json({ error: 'nu exista date' });
      }
      const conferintaId = reviewer.conferintumId;
      const articles = await Articol.findAll({
        where: { conferintumId: conferintaId },
      });
  
      res.status(200).json(articles);
  
    } catch (error) {
      console.error('Error getting the articles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //nefunctional
  router.post("articles/:idArticol/changeStatus", async (req, res) => {
    try {

    } catch (error) {
      console.error('Error getting the articles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //nefunctional
  router.put("/articles/:givenId/updateFeedback", async (req, res) => {
    try {
      const { givenId } = req.params.givenId;
      const { newFeedback } = req.body;
  
      const [updatedRowsCount, updatedArticles] = await Articol.update(
        { feedback: newFeedback },
        { returning: true, where: { id: givenId } }
      );
  
      // Check if any rows were affected (updated)
      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      // Send the updated article as a response if needed
      const updatedArticle = updatedArticles[0];
      res.status(200).json({ success: true, updatedArticle });
    } catch (error) {
      console.error('Error updating article feedback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //nefunctional
  const updateArticol = async (req, res, next) => {
    try {
      const articol = await Articol.findByPk(req.params.id);
      if (articol) {
        // Check if req.body.feedback is provided
        if (req.body.feedback !== undefined) {
          // If feedback is provided, update only the feedback field
          await articol.update({ feedback: req.body.feedback });
        } else {
          // Otherwise, update the entire articol with the data from req.body
          await articol.update(req.body);
        }
  
        res.status(200).json(articol);
      } else {
        res.status(404).json({ message: "Articol not found" });
      }
    } catch (err) {
      next(err);
    }
  };

module.exports = router;
