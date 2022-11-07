const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/v1/user.route");

app = express();
port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Wellcome to random user generator api");
});

app.use("/api/v1/user", userRoutes);
