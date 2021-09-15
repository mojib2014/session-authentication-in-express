const router = require("express").Router();
const users = require("../db");
const redirectHome = require("../middlewares/redirectHome");

router.get("/", redirectHome, (req, res) => {
  res.render("registerForm");
});

router.post("/", redirectHome, (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    // TODO: validation required
    let user = users.some((user) => user.email === email);

    if (!user) {
      user = {
        id: users.length++,
        name,
        email,
        password, // TODO: Hash
      };

      users.push(user);
      req.session.userId = user.id;

      return res.redirect("/home"); // TODO: query strings error
    }
  }
  res.redirect("/login");
});

module.exports = router;
