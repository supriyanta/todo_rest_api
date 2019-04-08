//@ts-check
const bcrypt = require("bcrypt");
const User = require("../model/User");

const saltRounds = 10;

const hashPassword = async password => {
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

const checkHash = async (password, hash) => {
	let isMatch = await bcrypt.compare(password, hash);
	return isMatch;
};

module.exports = {
	createUser: async (req, res) => {
		const { name, email, password } = req.body;
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.json({ msg: "User already exists" });
		}
		// TODO: validate before save
		const hash = await hashPassword(password);
		let newUser = new User({ name, email, password: hash });
		const user = await newUser.save();
		res.json({ msg: "Signing up successful!" });
	},
	loginUser: async (req, res) => {
		const { email, password } = req.body;
		const userExist = await User.findOne({ email });
		if (!userExist) {
			return res.json({ msg: "No user exists, check your credentials" });
		}
		let isMatch = await checkHash(password, userExist.password);
		if (!isMatch) {
			return res.json({ msg: "Password incorrect" });
		}
		res.json({ msg: "Login successful" });
	}
};
