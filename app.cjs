const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Homepage with form
app.get("/", (req, res) => {
  res.render("index");
});

// Handle joke request
app.post("/joke", async (req, res) => {
  const userName = req.body.name || "Friend";

  try {
    // Fetch joke from JokeAPI
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");
    const jokeData = response.data;

    let joke;
    if (jokeData.type === "single") {
      joke = jokeData.joke;
    } else {
      joke = `${jokeData.setup} ... ${jokeData.delivery}`;
    }

    res.render("joke", { name: userName, joke });
  } catch (err) {
    console.error(err);
    res.render("joke", { name: userName, joke: "Oops! Couldn't fetch a joke right now." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
