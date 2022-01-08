const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');

var con = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "bc9d7cd553bc3e",
  password: "04fae99b",
  database: "heroku_c8e7bb0380bec6d"
});

app.get('/', (req, res) => {
  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "SELECT orderid AS 'Order ID', ROUND(ordertotalprice,2) AS 'Total Price', orderquantity AS 'Order Quantity', orderstatus AS 'Status', DATE_FORMAT(orderdate, '%d-%m-%Y')AS 'Order Date', agentid AS 'Agent ID' FROM orders";
      con.query(sql, function (err, result, fields) {
        if (err) { throw err; }
        else {
			console.log(result);
          res.send(result);
        }
      tempconnection.release();
      });
    }
  });
});

app.listen(process.env.PORT||4008, () => {
    console.log('Listening ok dah jadi.');
});
