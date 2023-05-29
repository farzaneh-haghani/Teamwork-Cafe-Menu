const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data.json");
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/home", function (request, response) {
  response.status(200).json(data);
});

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

app.post("/", (req, res) => {
  res.json({ success: true });
});

app.get("/menu/q", function (request, response) {
  const str = request.query.str;

  const filteredMenuItems = menuData.filter((item) => {
    return (
      item.title.toLowerCase().includes(str) ||
      item.category.toLowerCase().includes(str) ||
      item.desc.toLowerCase().includes(str)
    );
  });

  if (filteredMenuItems.length > 0) {
    response.status(200).json(filteredMenuItems);
  } else {
    response.status(404).json({ message: "No items match." });
  }
});

app.listen(PORT, () => console.log("Your app is listening on port " + PORT));
