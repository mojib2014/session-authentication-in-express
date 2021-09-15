const express = require("express");
const session = require("express-session");

// Routes
const home = require("./routes/home");
const main = require("./routes/main");
const login = require("./routes/login");
const logout = require("./routes/logout");
const register = require("./routes/register");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 5000,
  NODE_ENV = "development",

  SESSION_NAME = "sid",
  SESSION_SECRET = "mojib",
  SESSION_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "production";

const app = express();

// Setup view engine
app.set("view engine", "ejs");

//Serves static files (we need it to import a css file)
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  }),
);

app.use("/", main);
app.use("/home", home);
app.use("/login", login);
app.use("/logout", logout);
app.use("/register", register);

app.listen(PORT, () =>
  console.log(`App listening for incoming request on port ${PORT}...`),
);
