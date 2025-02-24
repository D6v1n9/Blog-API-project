import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;
const API_URL = "https://localhost:4000";

//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the main page
app.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      console.log(response);
      res.render("index.ejs", { posts: response.data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
});

//Route to render the edit page
app.get("/new", (req,res) => {
    res.render("modify.ejs", {
        heading: "New post",
        submit: "Create post",
    });
})

app.get("/edit/:id", async (req,res) => {
    try {
        const response = await axios.get(`${API_URL}/post/${req.params.id}`);
        console.log(response.data);
        res.render("modify.ejs", {
            heading: "Edit post",
            submit: "Update post",
            post: response.data,
        });
    } catch (error) {
        res.status(404).json({ message: "Error fetching post" });
    }
})

//Route to Create a new post

app.post("/api/posts", async (req,res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, {
            posts: req.body,
        });
        console.log(response.body);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
})

//Route to Partially update a post

app.patch("/api/posts/:id", async (req,res) => {
    try {
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
})

//Route to Delete a post

app.delete("/api/posts/:id", async (req,res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
})

app.listen(port,() => {
    console.log(`Server is running on https://localhost:${port}`);
})