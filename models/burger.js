var orm = require("../config/orm.js");

var burger = {
  allBurgers: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },

  createBurger: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  updateBurger: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
}

module.exports = burger;