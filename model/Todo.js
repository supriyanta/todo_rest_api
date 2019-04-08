//@ts-check
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
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
