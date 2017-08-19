var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req,res) {

  burger.allBurgers(function(data) {
    var hbsObject = {
      burgers: data
    }
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//show burgers in db
router.post("/", function(req, res) {

  burger.createBurger([
    "burger_name", "devoured"
    ], [
      req.body.name, req.body.ate
    ], function() {
      res.redirect("/");
    });
});

//update a burger to eaten or not
router.put("/:id", function(req,res) {
  var condition = "id = " + req.params.id;

  console.log("condition " + condition);

  burger.updateBurger({
    devoured: req.body.ate
  }, condition, function() {
    res.redirect("/");
  });
});

//router export for server.js
module.exports = router;