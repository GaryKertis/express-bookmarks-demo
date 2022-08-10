const db = require("../db/dbConfig");

// GET ALL
const getAllReviews = async () => {
  try {
    const allReviews = await db.any("SELECT * FROM reviews");
    return allReviews;
  } catch (error) {
    return error;
  }
};

const createReview = async ({
  reviewer,
  title,
  content,
  rating,
  bookmark_id,
}) => {
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (reviewer, title, content, rating, bookmark_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [reviewer, title, content, rating, bookmark_id]
    );
    return newReview;
  } catch (error) {
    return error;
  }
};

const getReview = async (id) => {
  try {
    const oneReview = await db.one("SELECT * FROM review WHERE id=$1", id);
    return oneReview;
  } catch (error) {
    return error;
  }
};

const deleteReview = async (id) => {
  try {
    const oneReview = await db.one(
      "DELETE FROM reviews WHERE id=$1 RETURNING *",
      id
    );
    return oneReview;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const updateReview = async (
  id,
  { reviewer, title, content, rating, bookmark_id }
) => {
  try {
    const updateReview = await db.one(
      "UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4, bookmark_id=$5 where id=$6 RETURNING *",
      [reviewer, title, content, rating, bookmark_id, id]
    );
    return updateReview;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
  getReview,
  updateReview,
};
