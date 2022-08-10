const express = require("express");
const router = express.Router();
const reviewsController = require("./reviews");
const {
  getAllBookmarks,
  getBookmark,
  deleteBookmark,
  updateBookmark,
  createBookmark,
} = require("../queries/bookmarks");
const { checkBoolean, checkName } = require("../validations/checkBookmarks");

router.use("/:bookmark_id/reviews", reviewsController);
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
router.put("/:id", checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await updateBookmark(req.params.id, req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  // ?????
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark) {
    if (deletedBookmark.id) {
      res.status(200).json(deletedBookmark);
    } else {
      res.status(404).json({ error: "Bookmark not found" });
    }
  } else {
    console.error(deletedBookmark);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
