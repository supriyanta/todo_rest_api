//@ts-check

const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		min: 3
	},
	todos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Todo"
		}
	]
});

UserSchema.virtual("todolists", {
	ref: "Todo",
	localField: "_id",
	foreignField: "owner",
	justOne: false
});

module.exports = mongoose.model("User", UserSchema);
