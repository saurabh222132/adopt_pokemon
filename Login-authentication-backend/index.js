import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import cron from "node-cron";

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
//===================================================Login Route (Searching for data in database)==========================

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

//============================== Register route (inserting Data in database ) =================================================
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

//==================================store the pokemon in database (insert Data in the database) ================================

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
//=============fetching the stored pokemon from the database and send to the client (read Data from the database )==================
app.post("/pokemonlist", async (req, res) => {
  Data.find({ email: req.body.email }, async (err, result) => {
    res.send(result);
  });
});

//=========================================feed Route (Update Health in Database)=========================================

app.post("/feed", async (req, res) => {
  console.log(req.body);
  Data.updateOne(
    { $and: [{ pokemonid: req.body.id }, { health: { $lt: 100 } }] },

    { $inc: { health: 10 } }
  ).then((err, result) => {
    console.log(result);
  });
  res.send({ message: "health increases!" });
});

//============================Drop Route (Delete pokemon from database)================================

app.post("/drop", async (req, res) => {
  console.log(req.body);

  Data.deleteOne({ pokemonid: req.body.pokemonid }).then((res) => {
    if (res) {
      console.log(res);
    }
  });
  res.send({ message: "data Deleted succeffuly from database" });
});

//======================Scheduling job with node-cron for decreasing health status=======================

// let value = 50;
// var task = cron.schedule(`*/${value} * * * * *`, async function () {
//   console.log("running a task every 50 seconds");

//   await Data.updateMany(
//     { health: { $gt: 0 } },
//     { $inc: { health: -10 } },
//     async (err, result) => {
//       console.log(result);
//     }
//   );
//   // use node cron here
// });

app.listen(port, () => {
  console.log(`BE started at port ${port}`);
});
