const router = require("express").Router();
const auth = require("../middlewares/auth");
const users = require("../db");

router.get("/", auth, (req, res) => {
  const user = users.find((user) => user.id === req.session.userId);

  res.render("home", { user });
});

module.exports = router;
