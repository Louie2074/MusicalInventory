const async = require('async');
var Song = require('../models/song');
var Artist = require('../models/artist');
var Genre = require('../models/genre');
var Album = require('../models/album');

exports.song_detail = (req, res, next) => {
  Song.find({ _id: req.params.id }).populate("artists").exec((err, results) => {
    if (err) return next(err);
    console.log(results);
    res.render('song_detail', {
      title: results.name,
      error: err,
      song: results[0],
    });
  });
};
