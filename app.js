require("dotenv").config();

const express = require("express");
const userRoute = require("./routes/user");
const BlogRoute = require("./routes/blog");
const Blog = require("./models/blog");

const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middleWares/authentication");
const app = express();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb Connected"));

// Set EJS as templating engine and define views directory as current directory

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))); // it shows image
// because express by default treat as path

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", BlogRoute);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
