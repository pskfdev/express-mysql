const express = require("express");
const core = require("cors");
const bodyParser = require("body-parser");
const db_con = require("./db");

const app = express();

//แปลงข้อมูล json ให้เป็น object
app.use(bodyParser.json({ limit: "20mb" }));
//อนุญาตให้เรียกข้อมูลข้าม Domain
app.use(core());




app.get("/", (req, res) => {
  res.send("<h1>welcome to my api</h1>");
});

//Get All
app.get("/customer", (req, res) => {
  try {
    db_con.query("SELECT * FROM `customers`", (err, results, fields) => {
      res.json(results);
    });
  } catch (err) {
    res.status(500).send("Server Error!!");
  }
});

//Get One
app.get("/customer/:id", (req, res) => {
  const { id } = req.params;
  db_con.query(
    "SELECT * FROM `customers` WHERE `cust_id` = ?",
    [id],
    (err, results, fields) => {
      if (err) {
        res.status(400).json({ msg: "Error read data" });
      }

      res.json({
        cust_id: results[0].cust_id,
        cust_name: results[0].cust_name,
        cust_address: results[0].cust_address,
        cust_postcode: results[0].cust_postcode,
        cust_phone: results[0].cust_phone,
        cust_fax: results[0].cust_fax,
        cust_email: results[0].cust_email,
      });
    }
  );
});

//Create
app.post("/customer", (req, res) => {
  const {
    cust_id,
    cust_name,
    cust_address,
    cust_postcode,
    cust_phone,
    cust_fax,
    cust_email,
  } = req.body;

  db_con.query(
    "INSERT INTO `customers`(`cust_id`, `cust_name`, `cust_address`, `cust_postcode`, `cust_phone`, `cust_fax`, `cust_email`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      cust_id,
      cust_name,
      cust_address,
      cust_postcode,
      cust_phone,
      cust_fax,
      cust_email,
    ],
    (err, results, fields) => {
      if (err) {
        res.status(400).json({ msg: "Error create data" });
      }

      res.json({ results: results, mgs: "create data success" });
    }
  );
});

//Update
app.put("/customer", (req, res) => {
  const {
    cust_id,
    cust_name,
    cust_address,
    cust_postcode,
    cust_phone,
    cust_fax,
    cust_email,
  } = req.body;

  db_con.query(
    "UPDATE `customers` SET `cust_name`= ?, `cust_address`= ?, `cust_postcode`= ?, `cust_phone`= ?, `cust_fax`= ?, `cust_email`= ? WHERE cust_id = ?",
    [
      cust_name,
      cust_address,
      cust_postcode,
      cust_phone,
      cust_fax,
      cust_email,
      cust_id,
    ],
    (err, results, fields) => {
      if (err) {
        res.status(400).json({ msg: "Error update data" });
      }

      res.json({ results: results, mgs: "update data success" });
    }
  );
});

//Delete
app.delete("/customer/:id", (req, res) => {
  const { id } = req.params;

  /* console.log(id); */
  db_con.query(
    "DELETE FROM `customers` WHERE cust_id = ?",
    [id],
    (err, results, fields) => {
      if (err) {
        res.status(400).json({ msg: "Error delete data" });
      }

      res.json({ results: results, mgs: "delete data success" });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
