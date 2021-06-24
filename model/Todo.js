//@ts-check
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true
	}
});

module.exports = mongoose.model("Todo", TodoSchema);
