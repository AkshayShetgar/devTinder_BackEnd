const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = 3000;

app.use(cors({
  origin : "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/users");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()
  .then(() => {
    console.log("succesfully Database connected");
    app.listen(port, () => {
      console.log("Server is created successfully...");
    });
  })
  .catch((err) => console.error("Database cannot be connected"));
