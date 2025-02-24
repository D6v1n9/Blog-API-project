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



app.listen(port,() => {
    console.log(`Server is running on https://localhost:${port}`);
})