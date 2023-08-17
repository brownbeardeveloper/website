const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(bodyParser.json());

app.post("/auth/login", (req, res) => {
    const idToken = req.body.idToken;

    // Verifiera ID-token från klienten med Firebase
    // Här bör du använda Firebase-adminbiblioteket för att verifiera tokenet

    // Om verifieringen är lyckad, generera ett JWT autentiseringstoken
    const accessToken = jwt.sign({ userId: "användarens-id" }, "din-hemliga-nyckel", {
        expiresIn: "1h" // Tokenets utgångsdatum
    });

    // Svara tillbaka med JWT autentiseringstoken
    res.json({ accessToken });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});