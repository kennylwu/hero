const express = require("express");
const usersOriginal = require("../data/users");
const { check, validationResult } = require("express-validator/check");

module.exports = app => {
  let usersCopy = [...usersOriginal];
  let userCount = usersCopy.length;

  const router = express.Router();
  router.delete("/food", (req, res) => {
    console.log(req.query);
    try {
      const id = req.body.id;
      usersCopy.splice(id - 1, 1);
      userCount -= 1;
      res.send({
        success: true
      });
    } catch (err) {
      res.status(422).send(err.toString());
    }
  });
  router.get("/foods", (req, res) => {
    const sorted = usersCopy.sort((a, b) => a.id - b.id);

    res.send(sorted);
  });
  router.post(
    "/food",
    [
      check("hero_name").exists(),
      check("first_name").exists(),
      check("last_name").exists()
    ],
    (req, res) => {
      try {
        validationResult(req).throw();
        userCount += 1;
        usersCopy.push({
          id: userCount,
          ...req.body
        });
        res.json({
          success: userCount
        });
      } catch (err) {
        res.status(422).send(err.toString());
      }
    }
  );

  app.use("/users", router);
};
