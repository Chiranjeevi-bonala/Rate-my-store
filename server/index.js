const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Rate My Store API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});