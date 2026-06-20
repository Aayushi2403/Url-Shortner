const Url = require("../models/Url");
const { nanoid } = require("nanoid");

// POST /api/shorten
const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ message: "Please provide a URL" });
  }

  try {
    // Check if URL already exists
    const existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.status(200).json(existing);
    }

    // Create new short URL
    const shortCode = nanoid(6);
    const url = await Url.create({ longUrl, shortCode });

    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/urls
const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /:shortCode  (redirect)
const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/urls/:id
const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findByIdAndDelete(req.params.id);

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { shortenUrl, getAllUrls, redirectUrl, deleteUrl };