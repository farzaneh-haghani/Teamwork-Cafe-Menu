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

//--------------------GET EDIT------------------------------
app.get("/admin/meals/:id/edit", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await db.query("SELECT * FROM menu WHERE id = $1", [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Item not found" });
    } else {
      const item = rows[0];
      res.status(200).json(item);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//--------------------PUT EDIT------------------------------
app.put("/admin/meals/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const newItem = req.body;

  db.query(
    "UPDATE menu SET title = $1, descript = $2, category = $3, price = $4, img = $5 WHERE id = $6 RETURNING *",
    [
      newItem.title,
      newItem.descript,
      newItem.category,
      newItem.price,
      newItem.img,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err });
      }

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No items found with the provided ID.",
        });
      }

      const updatedItem = result.rows[0];
      return res.status(200).json({ success: true, item: updatedItem });
    }
  );
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
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    res.status(400).json({
      success: "failure",
      message: "This id does not exist",
    });
  } else {
    data.splice(itemIndex, 1);
    res.status(200).json(data);
  }
});

//--------------------PORT---------------------------
const port = process.env.PORT ?? 3005;
app.listen(port, () => console.log("Your app is listening on port " + port));
