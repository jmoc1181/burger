var connection = require("../config/connection.js");

//helper functions for sql syntax
function printQMarks(num) {
  var arr = [];

  for (var i=0; i<num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }
  return arr.toString();
}

//object for sql statement functions
var orm = {
  selectAll: function(tableInput, cb) {
  var queryString = "SELECT * FROM " + tableInput + ";";
  connection.query(queryString, function(err, result) {
    if(err) {
      throw err;
    }
    cb(result);
  });
  },

  insertOne: function(table, cols, vals, cb) {
  var queryString = "INSERT INTO " + table;
  queryString += " (";
  queryString += cols.toString();
  queryString += ") ";
  queryString += "VALUES (";
  queryString += printQMarks(vals.length);
  queryString += ") ";

  console.log(queryString);

  connection.query(queryString, vals, function(err, result) {
    if(err) {
      throw err;
    }
    cb(result);
  });
  },

  updateOne: function(table, objColVals, condition, cb) {
  var queryString = "UPDATE " + table;
  queryString += " SET ";
  queryString += objToSql(objColVals);
  queryString += " WHERE ";
  queryString += condition;

  console.log(queryString);
  connection.query(queryString, function(err, result) {
    if (err) {
      throw err;
    }
    cb(result);
  });
  }

}

//export orm for burger.js
module.exports = orm