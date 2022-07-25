const async = require('async');
var Song = require('../models/song');
var Artist = require('../models/artist');
var Genre = require('../models/genre');
var Album = require('../models/album');

exports.artist_detail = (req, res, next) => {

  Artist.find({ _id: req.params.id })
    .exec((err, results) => {
      if (err) return next(err);
      console.log(results);
      res.render('artist_detail', {
        title: results.name,
        error: err,
        artist: results,
      });
    });
};
