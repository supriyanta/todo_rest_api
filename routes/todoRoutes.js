const { Router } = require("express");
const { showAllTodo, createTodo } = require("../controllers/todo.controller");

const router = Router();

router.get("/todos", showAllTodo);
router.post("/add", createTodo);

module.exports = router;
