const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("./connection");
const app = express();

const SECRET_KEY = "DRVDDTBU";

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// end point for login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const [user] = await db.query("SELECT * FROM user WHERE email = ? AND password = ? ;", [email, password]);
        if (user.length === 0) {
            return res.json({ status: false, message: "user not exist" });
        }
        console.log(user[0].username);
        const token = jwt.sign({ username: user[0].username }, SECRET_KEY, {
            expiresIn: 3 * 24 * 60 * 60
        })
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        })
        res.json({ status: true, message: "User logged.." })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
})


// end point for sign up
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await db.query("INSERT INTO user(id, username, email, password) VALUES(?, ?, ?, ?);", [
            new Date(), username, email, password
        ])
        if (!user) {
            return res.json({ status: false, message: "error" })
        }
        res.json({ status: true, message: "user created successfully" })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
})

// verify token
app.post("/token", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false })
    }
    const auth = jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
            return res.json({ status: false })
        }
        res.json({ status:true, user: data})
    })
})

app.listen(4000, () => {
    console.log("server created");
})

