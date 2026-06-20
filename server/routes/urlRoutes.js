const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  getAllUrls,
  deleteUrl,
} = require("../controllers/urlController");

router.post("/shorten", shortenUrl);
router.get("/urls", getAllUrls);
router.delete("/urls/:id", deleteUrl);

module.exports = router;