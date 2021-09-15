const router = require("express").Router();
const users = require("../db");

router.get("/", (req, res) => {
  res.render("loginForm");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  // TODO: validation required
  if (email && password) {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      req.session.userId = user.id;
      return res.redirect("/home");
    }
  }

  res.redirect("/login");
});

module.exports = router;
