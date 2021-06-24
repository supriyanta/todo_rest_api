const { Router } = require("express");
const { showAllTodo, createTodo, clearTodos } = require("../controllers/todo.controller");

const router = Router();

router.get("/:userId", showAllTodo);
router.delete("/:userId", clearTodos);
router.post("/", createTodo);

module.exports = router;
