const db = require("../db/dbConfig");

// GET ALL
const getAllReviews = async (bookmark_id) => {
  try {
    const allReviews = await db.any(
      `SELECT * FROM reviews WHERE bookmark_id = ${bookmark_id}`
    );
    return allReviews;
  } catch (error) {
    return error;
  }
};

const createReview = async (
  bookmark_id,
  { reviewer, title, content, rating }
) => {
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
    const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
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
  bookmark_id,
  { reviewer, title, content, rating }
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
