require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const router = require('./routes/routes');

const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(process.cwd(), 'access.log'), {
  flags: 'a',
});

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(router);

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    { stream: logStream }
  )
);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
