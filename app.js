//@ts-check

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const todoRouter = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const mongoDbUrl = "mongodb+srv://supriyanta34:iEqoQv5pUzVgK6wc@cluster0.fsevq.mongodb.net/db1?retryWrites=true&w=majority";
mongoose
	.connect(mongoDbUrl, { 
		useNewUrlParser: true,
		useUnifiedTopology: true 
	})
	.then(() => console.log("DB connected!"))
	.catch(e => console.log("DB connection failed!", e));
mongoose.set("useCreateIndex", true);

app.get("/", (req, res) => {
	res.json({
		msg: "Welcome to Todo rest api..."
	});
});

app.use("/", authRouter);
app.use("/api", todoRouter);

app.use("*", (req, res) => {
	res.status(404).json({
		error: "Url doesn't exist"
	});
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// TODO:
// 	strip out extra info from the response json
