const router = require("express").Router();
const Anime = require("../models/Anime");
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Create Anime

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newAnime = new Anime(req.body);
  try {
    const savedAnime = await newAnime.save();
    res.status(200).json(savedAnime);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedAnime = await Anime.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAnime);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.status(200).json("Anime Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Anime
router.get("/:id", async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Anime list
router.get("/", async (req, res) => {

  try {
    let animes= await Anime.find();
    res.status(200).json(animes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
