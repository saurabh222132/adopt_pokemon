import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.port;
//MongoDB atlas database

mongoose.set("strictQuery", true); // This line is added to remove DeprecationWarning

//===================================connecting to database================================
const main = async () => {
  try {
    await mongoose.connect(
      `${process.env.base_url}`,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },

      () => {
        console.log("DB connected");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
main();
// schema for storing user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//======================= schema for storing the adopted pokemons-=======================

const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  pokemonid: String,
  health: Number,
});

const Data = new mongoose.model("PokemonsList", dataSchema);

//======================= Home route======================
app.get("/", (req, res) => {
  res.send({ message: "This is the home route" });
});
//===================================================Login Route==========================

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // find user in database
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      //matching hash password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.send({ message: "Login Successfull!", user: user });
      } else {
        res.send({ message: " Password Did not match." });
      }
    } else {
      res.send({ message: "user not registered" });
    }
  });
});

//============================== Register route =================================================
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // check existing user
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      res.send({ message: "User already regisetered" });
    } else {
      //create hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      //create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      // saving the user

      await user.save((err) => {
        if (err) {
          res.send({ message: "err" });
        } else {
          res.send({ message: "Successfully registered! Please Login now" });
        }
      });
    }
  });
});

//==================================store the pokemon in database ================================

app.post("/storedata", async (req, res) => {
  const email = req.body.email;
  const pokemonid = req.body.id;
  const health = req.body.health;
  const name = req.body.name;

  Data.findOne({ pokemonid: pokemonid }, async (err, result) => {
    if (!result) {
      const data = new Data({
        name,
        email,
        pokemonid,
        health,
      });

      await data.save((err) => {
        if (err) {
          res.send({ message: "Something error occured" });
        } else {
          res.send({ message: "Pokemon adopted successfully!" });
        }
      });
    } else {
      res.send({
        message:
          "Pokemon is already adopted by you or another user please adopt another opkemon.",
      });
    }
  });
});
//=============fetching the stored pokemon from the database and send to the client=======
app.post("/pokemonlist", async (req, res) => {
  Data.find({ email: req.body.email }, async (err, result) => {
    res.send(result);
  });
});

//============check for individual pokemonid=======================
// app.get("/checkpokemonid", async (req, res) => {
//   console.log(req.body);
//   res.send("checkpokemonid request accepted");
// });

app.listen(port, () => {
  console.log(`BE started at port ${port}`);
});
