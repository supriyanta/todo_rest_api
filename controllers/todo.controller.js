//@ts-check
const Todo = require("../model/Todo");

module.exports = {
	createTodo: async (req, res) => {
		const { name, completed, userId } = req.body;
		// TODO: validate before save
		let newTodo = new Todo({ name, completed, owner: userId });
		let todo = await newTodo.save();
		res.json({ todo });
	},
	showAllTodo: async (req, res) => {
		const todos = await Todo.find({ owner: req.params.userId });
		res.json({ todos });
	},
	clearTodos: async (req, res) => {
		const finishedTodos = req.body.todos;
		await Todo.deleteMany({ owner: req.params.userId, _id: { $in: finishedTodos } });
		return res.json({ msg: "delete successful" });
	}
};
