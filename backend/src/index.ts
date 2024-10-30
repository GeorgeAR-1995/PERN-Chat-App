import express from "express";

const app = express()
const port = "5001";
app.get("/", (req, res) => {
    res.send("hello world!")
})

app.listen(5001, () => {
    console.log(`server is now running on port ${port}`);
});


