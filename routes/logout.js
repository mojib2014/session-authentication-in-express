const router = require("express").Router();
const auth = require("../middlewares/auth");

router.post("/", auth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/home");
    }

    res.clearCookie("sid");
    res.redirect("/login");
  });
});

module.exports = router;
