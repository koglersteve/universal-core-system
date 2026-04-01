const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Universal Core running on ${port}`));
