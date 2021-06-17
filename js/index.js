const express = require('express');
const dbCon = require('./dbConnection');
const logger = require("./logger");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


app.get('/ping', (req, res) => {
    res.send("RUNNINNNGGGG..");
});

app.post('/users', [dbCon.insert]);

app.get('/users/:id', [dbCon.getById]);

app.get('/users', [dbCon.getAll]);

app.delete('/users/:id', [dbCon.delete]);

dbCon.createTable();
app.listen(port, () => {
    logger.print(`Listening on port ${port}...`);
});