const express = require("express");
const app = express();
const port = process.env.PORT ?? 3005;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

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

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:3005`)
);
