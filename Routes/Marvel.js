const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");

router.get("/characters", async (req, res) => {
  const ts = uid2(8);
  const hash = md5(
    ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
  );
  const offset = req.query.offset;

  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/characters?limit=200&offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
  );
  res.json(response.data);
});

router.get("/comics", async (req, res) => {
  const ts = uid2(8);
  const hash = md5(
    ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
  );

  const offset = req.query.offset;

  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/comics?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
  );
  res.json(response.data);
});

module.exports = router;
