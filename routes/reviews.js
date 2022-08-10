const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  getReview,
  deleteReview,
  createReview,
  updateReview,
} = require("../queries/reviews");

router.get("/", async (req, res) => {
  // what really goes here???
  const { bookmark_id } = req.params;
  const allReviews = await getAllReviews(bookmark_id);
  if (allReviews[0]) {
    res.status(200).json(allReviews);
  } else {
    console.error(allReviews);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "not found" });
  }
});
// Create
router.post("/", async (req, res) => {
  try {
    const review = await createReview(req.params.bookmark_id, req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const review = await updateReview(
      req.params.id,
      req.params.bookmark_id,
      req.body
    );
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  // ?????
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  if (deletedReview) {
    if (deletedReview.id) {
      res.status(200).json(deleteReview);
    } else {
      res.status(404).json({ error: "Bookmark not found" });
    }
  } else {
    console.error(deletedReview);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
