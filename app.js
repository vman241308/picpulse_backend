const express = require('express');
const indexRouter = require('./routes/index');
const app = express();
const port = 3000;

// Use the routes
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})