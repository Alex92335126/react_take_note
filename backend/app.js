//Require modules
const express = require("express");
const cors = require("cors");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const jwt = require("jsonwebtoken");
const auth = require("./jwt-strategy");
require("dotenv").config();
const checkToken = require('./middleware/isLoggedIn')

const AuthRouter = require("./Routers/AuthRouter")
const AuthService = require("./service/AuthService")

const NoteRouter = require("./Routers/NoteRouter")
const NoteService = require("./service/NoteService")

//Setup Modules
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
auth(knex).initialize();

const authService = new AuthService(knex)
app.use("/auth", new AuthRouter(authService, express).router());

const noteService = new NoteService(knex)
app.use("/note", checkToken, new NoteRouter(noteService, express).router())

//Route
// app.post("/auth/signup", async (req, res) => {
//   // const username = req.body.username;
//   // const password = req.body.password;
//   const { username, password } = req.body;
//   console.log(username, password);
//   let query = await knex("users").where({ username }).first();
//   const hashed = await bcrypt.hash(password, 10);
//   if (query == undefined) {
//     await knex("users").insert({ username, password: hashed });
//     res.json("signup complete");
//   } else {
//     res.sendStatus(401);
//   }
// });

// app.post("/auth/login", async (req, res) => {
//   const { username, password } = req.body;

//   let user = await knex("users").where({ username }).first();

//   if (user) {
//     let result = await bcrypt.compare(password, user.password);

//     if (result) {
//       const payload = {
//         id: user.id,
//         username: user.username,
//       };
//       const token = jwt.sign(payload, process.env.JWT_SECRET);
//       res.json({ token });
//     } else {
//       res.sendStatus(401);
//     }
//   }
// });

app.get("/todo", async (req, res) => {
  let token = req.headers.authorization;
  token = token.replace("Bearer ", "");
  let verify = jwt.verify(token, process.env.JWT_SECRET);
  if (verify) {
    res.json({
      todo: ["get bottle of water", "water plants", "eat breakfast"],
    });
  } else {
    res.sendStatus(401);
  }
});

app.listen(8000, () => console.log("Listening to port 8000"));
