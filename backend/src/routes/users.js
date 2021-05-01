const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
