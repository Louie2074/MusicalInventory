#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Song = require('./models/song');
var Artist = require('./models/artist');
var Genre = require('./models/genre');
var Album = require('./models/album');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var artists = [];
var genres = [];
var songs = [];
var albums = [];

function artistCreate(first_name, last_name, d_birth, d_death, cb) {
  artistdetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) artistdetail.date_of_birth = d_birth;
  if (d_death != false) artistdetail.date_of_death = d_death;

  var artist = new Artist(artistdetail);

  artist.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Artist: ' + artist);
    artists.push(artist);
    cb(null, artist);
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
    genres.push(genre);
    cb(null, genre);
  });
}

function songCreate(title, artists, duration, date, explicit, cb) {
  songdetail = {
    title: title,
    duration: duration,
    artists: artists,
    explicit: explicit,
    date:date
  };

  var song = new Song(songdetail);
  song.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Song: ' + song);
    songs.push(song);
    cb(null, song);
  });
}

function albumCreate(title, artist, date, songs, genre, cb) {
  albumDetail = {
    title,
    artist,
    date,
    songs,
    genre,
  };
  var album = new Album(albumDetail);
  album.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Album: ' + album);
      cb(err, null);
      return;
    }
    console.log('New Album: ' + album);
    albums.push(album);
    cb(null, album);
  });
}

function createGenreArtists(cb) {
  async.series(
    [
      function (callback) {
        artistCreate('Post', 'Malone', '1973-06-06', false, callback);
      },
      function (callback) {
        artistCreate('Kid', 'Laroi', '1932-11-8', false, callback);
      },
      function (callback) {
        artistCreate(
          'Bruce',
          'Springsteen',
          '1920-01-02',
          '1992-04-06',
          callback
        );
      },
      function (callback) {
        artistCreate('Young', 'Thug', '1999-01-02', false, callback);
      },
      function (callback) {
        artistCreate('Ed', 'Sheeran', '1971-12-16', false, callback);
      },
      function (callback) {
        genreCreate('Rap', callback);
      },
      function (callback) {
        genreCreate('Pop', callback);
      },
      function (callback) {
        genreCreate('Emo', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createSongs(cb) {
  async.parallel(
    [
      function (callback) {
        songCreate(
          'Better Off',
          [artists[0]],
          2.78,
          '2017-03-15',
          true,
          callback
        );
      },
      function (callback) {
        songCreate(
          'Goodbye',
          [artists[0], artists[3]],
          1.8,
          '2020-04-18',
          true,
          callback
        );
      },
      function (callback) {
        songCreate('Go', [artists[1]], 2.27, '2019-11-18', true, callback);
      },
      function (callback) {
        console.log(artists[0]);
        songCreate(
          'Born to Run',
          [artists[2]],
          3.49,
          '1994-01-07',
          false, 
          callback
        );
      },
      function (callback) {
        songCreate(
          'Lego House',
          [artists[4]],
          4.1,
          '2015-09-22',
          false,
          callback
        );
      },
      function (callback) {
        songCreate(
          'Shape of You',
          [artists[0], artists[4]],
          5.6,
          '2018-10-31',
          false,
          callback
        );
      },
      function (callback) {
        songCreate(
          'Missing You',
          [artists[1]],
          2.86,
          '2010-03-03',
          true,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createAlbums(cb) {
  async.parallel(
    [
      function (callback) {
        albumCreate(
          'beerbongs and bentleys',
          artists[0],
          '2018-07-15',
          [songs[0]],
          genres[0],
          callback
        );
      },
      function (callback) {
        albumCreate(
          '+',
          artists[4],
          '2011-01-05',
          [songs[4], songs[5]],
          genres[1],
          callback
        );
      },
      function (callback) {
        albumCreate(
          'F*ck Love',
          artists[1],
          '2020-11-12',
          [songs[2], songs[6]],
          genres[2],
          callback
        );
      },
      function (callback) {
        albumCreate(
          'Born to Run',
          artists[0],
          '1975-08-27',
          [songs[3]],
          genres[1],
          callback
        );
      },
      function (callback) {
        albumCreate(
          'Revival',
          artists[0],
          '2022-07-23',
          [songs[1], songs[6]],
          genres[0],
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createGenreArtists, createSongs, createAlbums],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Albums: ' + albums);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
