const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json())

app.get("/tshirt", (req, res) => {
    res.status(200).send({
        "tshirt": "red",
        "size": "small"
    })
});

app.post("/tshirt/:id", (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;
    if (!logo) {
        res.status(418).send({message : "We need a logo!!"})
    }
    res.send({
        tshirt : `We have the log ${logo} with id: ${id}`
    })
})

app.listen(PORT, () => console.log(`S server running on http://localhost:${PORT}`));
