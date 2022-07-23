#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Song = require('./models/song')
var Artist = require('./models/artist')
var Genre = require('./models/genre')
var Album = require('./models/album')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var artists = []
var genres = []
var songs = []
var albums = []

function artistCreate(first_name, last_name, d_birth, d_death, cb) {
  artistdetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) artistdetail.date_of_birth = d_birth;
  if (d_death != false) artistdetail.date_of_death = d_death;

  var Artist = new Artist(artistdetail);

  Artist.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Artist: ' + Artist);
    artists.push(Artist);
    cb(null, Artist);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function songCreate(title,artists, duration,date,explicit, cb) {
  songdetail = {
    title: title,
    duration: duration,
    artists: artists,
    explicit:explicit,

  };

  var Song = new Song(songdetail);
  Song.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Song: ' + Song);
    songs.push(Song);
    cb(null, Song);
  });
}


function albumCreate(title, artist, date, songs,genre, cb) {
  albumDetail = {
    title,
    artist,
    date,
    songs,
    genre
  }
  var Album = new Album(albumDetail);
  Album.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Album: ' + Album);
      cb(err, null);
      return;
    }
    console.log('New Album: ' + Album);
    albums.push(Album);
    cb(null, Album);
  });
}


function createGenreArtists(cb) {
    async.series([
        function(callback) {
          artistCreate('Post', 'Malone', '1973-06-06', false, callback);
        },
        function(callback) {
          artistCreate('Kid', 'Laroi', '1932-11-8', false, callback);
        },
        function(callback) {
          artistCreate('Bruce', 'Springsteen', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          artistCreate('Young', 'Thug', '1999-01-02', false, callback);
        },
        function(callback) {
          artistCreate('Ed', 'Sheeran', '1971-12-16', false, callback);
        },
        function(callback) {
          genreCreate("Rap", callback);
        },
        function(callback) {
          genreCreate("Pop", callback);
        },
        function(callback) {
          genreCreate("Emo", callback);
        },
        ],
        // optional callback
        cb);
}


function createSongs(cb) {
    async.parallel([
        function(callback) {
          songCreate("Better Off", [artists[0]], 2.78,  callback);
        },
        function(callback) {
          songCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', artists[0], [genres[0],], callback);
        },
        function(callback) {
          songCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', artists[0], [genres[0],], callback);
        },
        function(callback) {
          songCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', artists[1], [genres[1],], callback);
        },
        function(callback) {
          songCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', artists[1], [genres[1],], callback);
        },
        function(callback) {
          songCreate('Test Song 1', 'Summary of test book 1', 'ISBN111111', artists[4], [genres[0],genres[1]], callback);
        },
        function(callback) {
          songCreate('Test Song 2', 'Summary of test book 2', 'ISBN222222', artists[4], false, callback)
        }
        ],
        // optional callback
        cb);
}


function createBookInstances(cb) {
    async.parallel([
        function(callback) {
          albumCreate(songs[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          albumCreate(songs[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          albumCreate(songs[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          albumCreate(songs[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          albumCreate(songs[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          albumCreate(songs[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          albumCreate(songs[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          albumCreate(songs[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          albumCreate(songs[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          albumCreate(songs[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          albumCreate(songs[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series(
  [createGenreArtists, createSongs, createBookInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + albums);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
