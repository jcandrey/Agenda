const router = require("express").Router();
const {
  getNotes,
  getNote,
  updateNote,
  createNote,
  deleteNote,
} = require("../controllers/notes.controllers");

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;
