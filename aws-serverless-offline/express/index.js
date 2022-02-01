const serverlessApp = require("serverless-http");
const bodyParser = require("body-parser");
const expressApp = require("express");

const app = expressApp();

// app.use(bodyParser.json({ strict: false }));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/express", function (req, res) {
  res.send("Hello Express js World!");
});

app.post("/express/users/create", function (req, res) {
  const { userId, name } = req.body;
  res.json({ userId, name });
});

module.exports.handler = serverlessApp(app);
