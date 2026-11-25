const express = require('express');
const { requireAuth } = require('../middleware');

const router = express.Router();


let movies = [
  { id: 1, title: 'Laskar Pelangi', genre: 'Drama', year: 2008, rating: 7.8 },
  { id: 2, title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8 },
  { id: 3, title: 'Parasite', genre: 'Thriller', year: 2019, rating: 8.5 },
  { id: 4, title: 'Spirited Away', genre: 'Animation', year: 2001, rating: 8.6 },
  { id: 5, title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0 },
];

function findMovie(id) {
  const movie = movies.find((m) => m.id === Number(id));
  if (!movie) {
    const err = new Error('Movie not found');
    err.status = 404;
    throw err;
  }
  return movie;
}

router
  .route('/')
  .get((req, res) => {
    res.json(movies);
  })
  .post((req, res) => {
    const { title, genre, year, rating } = req.body || {};

    
    if (!title || !genre || year === undefined || rating === undefined) {
      const err = new Error('title, genre, year, rating wajib diisi');
      err.status = 400;
      throw err;
    }

    
    const newId = movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1;
    const newMovie = { id: newId, title, genre, year, rating };
    movies.push(newMovie);
    res.status(201).json(newMovie);
  });


router.get('/search', (req, res) => {
  const keyword = (req.query.title || '').toLowerCase();
  const result = movies.filter((m) => m.title.toLowerCase().includes(keyword));
  res.json(result);
});

// GET /movies/genre atau /movies/genre/Drama
router.get('/genre{/:name}', (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.json(movies);
  }
  const result = movies.filter((m) => m.genre.toLowerCase() === name.toLowerCase());
  res.json(result);
});

// GET, PUT, DELETE /movies/:id
router
  .route('/:id')
  .get(async (req, res) => {
    res.json(findMovie(req.params.id));
  })
  .put(async (req, res) => {
    const movie = findMovie(req.params.id);
    const { title, genre, year, rating } = req.body || {};

    if (title !== undefined) movie.title = title;
    if (genre !== undefined) movie.genre = genre;
    if (year !== undefined) movie.year = year;
    if (rating !== undefined) movie.rating = rating;

    res.json(movie);
  })
  .delete(requireAuth, async (req, res) => {
    const movie = findMovie(req.params.id);
    movies = movies.filter((m) => m.id !== movie.id);
    res.json({ message: 'Movie deleted', deleted: movie });
  });

module.exports = router;