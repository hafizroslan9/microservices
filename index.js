const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');

var con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b45c552be3803d",
  password: "4fa79fab",
  database: "heroku_5e9f153ed6f0b20"
});

app.get('/', (req, res) => {
  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "SELECT * FROM product";
      con.query(sql, function (err, result, fields) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      tempconnection.release();
      });
    }
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to port 4000.');
});