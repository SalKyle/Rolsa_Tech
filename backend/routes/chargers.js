const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
    const { lat, lon } = req.query;
  
    try {
      const response = await axios.get("https://api.openchargemap.io/v3/poi/", {
        params: {
          output: "json",
          latitude: lat,
          longitude: lon,
          distance: 10,
          maxresults: 25,
          compact: true,
          verbose: false,
          key: process.env.OPENCHARGEMAP_API_KEY || "demo", // Use 'demo' for testing
        },
      });
  
      res.json(response.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to fetch charging stations" });
    }
  });

module.exports = router;
