//@ts-check
const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

// const hashPassword = async password => {
// 	const hash = await bcrypt.hash(password, saltRounds);
// 	return hash;
// };

// const checkHash = async (password, hash) => {
// 	let isMatch = await bcrypt.compare(password, hash);
// 	return isMatch;
// };

const trimUser = (user) => {
	let userDoc = user.toJSON();
	let { _id, name, email } = userDoc;
	return { _id, name, email };
}

module.exports = {
	createUser: async (req, res) => {
		const { name, email, password } = req.body;
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.json({ err: "Email already exists" });
		}
		// TODO: validate before save
		// const hash = await hashPassword(password);
		let newUser = new User({ name, email, password });
		const user = await newUser.save();
		res.status(201).json({ msg: "Signing up successful!", user: trimUser(user) });
	},
	loginUser: async (req, res) => {
		const { email, password } = req.body;
		const userExist = await User.findOne({ email });
		if (!userExist) {
			return res.json({ err: "Email or Password incorrect" });
		}
		let isMatch = (password == userExist.password);
		if (!isMatch) {
			return res.json({ err: "Email or Password incorrect" });
		}
		// const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
		res.status(200).json({ msg: "Login successful", token: "hello1234", user: trimUser(userExist) });
	}
};
