const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { Pool } = require("pg");

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

db.connect();

// // --------------------GET ALL--------------------------
app.get("/", function (request, response) {
  db.query("SELECT * FROM menu ", (err, result) => {
    if (err) {
      response.status(500).json({ success: false });
    } else {
      console.log(result.rows);
      response.status(200).json(result.rows);
    }
  });
});

// --------------------GET ONE---------------------------
app.get("/admin/q", function (request, response) {
  const str = request.query.str.toLowerCase();

  db.query(
    "SELECT * FROM menu WHERE LOWER(title) LIKE '%' || $1 || '%' OR LOWER(descript) LIKE '%' || $1 || '%'",
    [str],
    (err, result) => {
      if (err) {
        response.status(500).json({ success: false });
      } else {
        if (result.rows.length > 0) {
          response.status(200).json(result.rows);
        } else {
          response.status(404).json({ message: "No items match." });
        }
      }
    }
  );
});

//--------------------EDIT------------------------------
app.put("/editForm", (req, res) => {
  const id = parseInt(req.body.id);
  const newItem = req.body;

  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    res.status(400).json({
      success: "failure",
      message: "This id does not exist",
    });
  }

  data.splice(itemIndex, 1, newItem);
  res.status(200).json({ success: true, item: newItem });
});

app.post("/addForm", (req, res) => {
  const id = parseInt(req.body.id);
  const addedItem = req.body;
  const itemIndex = menuData.findIndex((item) => item.id === id);
  if (itemIndex === 1) {
    res
      .status(400)
      .json({ success: "failure", message: "This id already exists" });
  }
  menuData.push(addedItem);
  res.json(200).json({ success: true, item: addedItem });
});

//--------------------ADD------------------------------
app.post("/", (req, res) => {
  res.json({ success: true });
});

//--------------------DELETE---------------------------
app.delete("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      success: "failure",
      message: "This id does not exist"
    })
  }
  else {
    db.query("DELETE FROM menu WHERE id = $1 ", [id])
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(400).json({
            success: "failure",
            message: "This id does not exist"
          })
        }
        else {
          res.status(200).json({ success: true });
        }
      })
      .catch((err) => console.error(err));
  }
});


//--------------------PORT---------------------------
const port = process.env.PORT ?? 3005;
app.listen(port, () => console.log("Your app is listening on port " + port));
