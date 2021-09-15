const router = require("express").Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  const { userId } = req.session;

  res.render("main", { userId });
});

module.exports = router;
