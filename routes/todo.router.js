const express = require("express");
const router = express.Router();

const {
  getAllTodo,
  getTodoByID,
  addTodo,
  deleteTodoByID,
  deleteTodo,
  updateTodoByID,
} = require("../controllers/todo.controller");

router.get("/", getAllTodo);
router.get("/:id", getTodoByID);
router.post("/", addTodo);
router.delete("/:id", deleteTodoByID);
router.delete("/", deleteTodo);
router.put("/:id", updateTodoByID);

module.exports = router;
