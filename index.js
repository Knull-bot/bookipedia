import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
const API_KEY = "";
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
    let response  = await axios.get(`${API_URL}${req.body.book}&maxResults=40`, {
        params: {apiKey: API_KEY}
    });
    console.log(response.data.items.length)
    res.render("index.ejs", { content: response.data.items });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${ port }`);
});