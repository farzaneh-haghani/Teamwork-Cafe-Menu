const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data.json");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => res.status(200).json({ data: data }));

app.put("/editForm", (req, res) => {
  const id = parseInt(req.body.id);
  const newItem = req.body;
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    res
      .status(400)
      .json({ success: "failure", message: "This id does not exist" });
  }
  data.splice(itemIndex, 1, newItem);
  res.status(200).json({ success: true, item: newItem });
});
const port = process.env.PORT ?? 3005;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:3005`)
);
