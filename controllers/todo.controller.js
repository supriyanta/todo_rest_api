//@ts-check
const Todo = require("../model/Todo");

module.exports = {
	createTodo: async (req, res) => {
		const { name, description } = req.body;
		// TODO: validate before save
		let newTodo = new Todo({ name, description });
		let todo = await newTodo.save();
		res.json({ todo });
	},
	showAllTodo: async (req, res) => {
		const todos = await Todo.find({});
		res.json({ todos });
	}
};
