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
      var sql = "SELECT orderid AS 'Order ID', ordertotalprice AS 'Total Price', orderquantity AS 'Order Quantity', orderstatus AS 'Status', TO_DATE(orderdate, 'dd,mm,YYYY')AS 'Order Date', agentid AS 'Agent ID' FROM orders";
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

app.listen(process.env.PORT || port, () => {
    console.log('Listening ok dah jadi.');
});