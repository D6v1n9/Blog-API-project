import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 4000;

app.listen(port,() => {
    console.log(`Server is running on https://localhost:${port}`);
})