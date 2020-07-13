const express = require("express");
const bodyParser = require('body-parser');
const users = require("./app/queries/users");
const posts = require("./app/queries/posts");
const comments = require("./app/queries/comments");
const app = express();
const cors = require('cors')
const PORT = 3000;

app.use(cors())

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/users", users.createUser);
app.get("/users", users.getUsers);
app.get("/users/:id", users.getUserById);
app.put("/users/:id", users.updateUser);
app.delete("/users/:id", users.deleteUser);

app.post("/posts", posts.createPost);
app.get("/posts", posts.getPosts);
app.get("/posts/:id", posts.getPostById);
app.get("/posts/userid/:userid", posts.getPostByUserid);
app.put("/posts/:id", posts.updatePost);
app.delete("/posts/:id", posts.deletePost);

app.post("/comments", comments.createComment);
app.get("/comments", comments.getComments);
app.get("/comments/:id", comments.getCommentById);
app.get("/comments/postid/:postid", comments.getCommentByPostid);
app.put("/comments/:id", comments.updateComment);
app.delete("/comments/:id", comments.deleteComment);

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});