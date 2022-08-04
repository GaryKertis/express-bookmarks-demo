const db = require("../db/dbConfig");

// GET ALL
const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (error) {
    return error;
  }
};

// CREATE
const createBookmark = async ({
  name,
  url,
  category,
  is_favorite,
  ...otherStuff
}) => {
  console.log(otherStuff);
  try {
    const newBookmark = await db.one(
      "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [name, url, category, is_favorite]
    );
    return newBookmark;
  } catch (error) {
    return error;
  }
};

const getBookmark = async (id) => {
  try {
    const oneBookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
    return oneBookmark;
  } catch (error) {
    return error;
  }
};

const deleteBookmark = async (id) => {
  try {
    const oneBookmark = await db.one(
      "DELETE FROM bookmarks WHERE id=$1 RETURNING *",
      id
    );
    return oneBookmark;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const updateBookmark = async (
  id,
  { name, url, category, is_favorite, ...otherStuff }
) => {
  console.log(id, name, url, category, is_favorite, otherStuff);
  try {
    const updateBookmark = await db.one(
      "UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 where id=$5 RETURNING *",
      [name, url, category, is_favorite, id]
    );
    return updateBookmark;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

module.exports = {
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
  getAllBookmarks,
};
