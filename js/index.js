const express = require('express');
const middleware = require('./middleware');
const logger = require("./logger");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    res.send("RUNNINNNGGGG..");
});

app.post('/users', [middleware.insert]);

app.get('/users/:id', [middleware.getById]);

app.get('/users', [middleware.getAll]);

app.delete('/users/:id', [middleware.delete]);

middleware.createTable();
app.listen(port, () => {
    logger.print(`Listening on port ${port}...`);
});