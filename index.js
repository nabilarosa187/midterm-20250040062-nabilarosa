const express = require('express');
const { logger, notFound, errorHandler } = require('./middleware');
const moviesRouter = require('./routes/movies');

const app = express();
const PORT = 3000;

// 1. Middleware
app.use(logger);
app.use(express.json());

// 2. Routes
app.get('/', (req, res) => {
  res.send('Welcome to Movie API! Created by Nabila Rosa | Theme: Movies');
});

// Named wildcard: /files/a/b/c -> ["a","b","c"]
app.get('/files/*path', (req, res) => {
  res.json({ path: req.params.path });
});

app.use('/movies', moviesRouter);

// 3. 404 handler (URL tidak dikenal)
app.use(notFound);

// 4. Error handler (4 parameter, paling akhir)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});