const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// Add express.json() middleware to parse JSON request bodies
app.use(express.json());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
        console.log("Database connection failed");
        // Send an error response (optional, but good practice)
        app.use((req, res, next) => {
            res.status(500).json({ error: "Database connection failed" });
        });
        // Stop the application from trying to start
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`database is listening node Running on port ${port}`);
        });
    }
});