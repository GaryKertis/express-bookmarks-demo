const express = require("express");
const router = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
} = require("../queries/bookmarks");
const { checkBoolean, checkName } = require("../validations/checkBookmarks");

// Index
router.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    console.error(allBookmarks);
    res.status(500).json({ error: "server error" });
  }
});

// Show
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.status(404).json({ error: "not found" });
  }
});
// Create
router.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// UPDATE
router.put("/:id", (req, res) => {
  // ?????
});

//DELETE
router.delete("/:id", (req, res) => {
  // ?????
});

module.exports = router;
