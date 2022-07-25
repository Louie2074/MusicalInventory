var express = require('express');
var router = express.Router();
const genre_controller = require("../controllers/genre_controller")
const album_controller = require("../controllers/albumController")
const artist_controller = require("../controllers/artistController.js")
const song_controller = require('../controllers/songController.js');

/// GENRE ROUTES ///

// GET catalog home page.
router.get('/', genre_controller.index);

// GET request for creating a genre. NOTE This must come before routes that display genre (uses id).
// router.get('/genre/create', genre_controller.genre_create_get);

// // POST request for creating genre.
// router.post('/genre/create', genre_controller.genre_create_post);

// // GET request to delete genre.
// router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// // POST request to delete genre.
// router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// // GET request to update genre.
// router.get('/genre/:id/update', genre_controller.genre_update_get);

// // POST request to update genre.
// router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all genre items.
router.get('/genres', genre_controller.genre_list);

router.get('/album/:id', album_controller.album_detail);
router.get('/albums', album_controller.album_list);
router.get('/artist/:id', artist_controller.artist_detail);
router.get('/artists', artist_controller.artist_list);
router.get('/song/:id', song_controller.song_detail);
router.get('/songs', song_controller.song_list);


module.exports = router;
