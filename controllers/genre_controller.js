
const async = require("async")
var Song = require('../models/song');
var Artist = require('../models/artist');
var Genre = require('../models/genre');
var Album = require('../models/album');


exports.index = function(req,res,next){
    async.parallel({
        genreCount(callback){Genre.countDocuments(callback)},
        albumCount(callback){Album.countDocuments(callback)},
        songCount(callback){Song.countDocuments(callback)},
        artistCount(callback){Artist.countDocuments(callback)}
    },(err,results)=>{
        if(err) return next(err)
        res.render('index', {
          title: 'Musical Inventory Home',
          error: err,
          data: results,
        });
    })
}

exports.genre_list = (req,res,next)=>{
    Genre.find().exec((err,results)=>{
        if(err) return next(err)
        res.render('genre_list',{title:"Genre List",error:err,data:results})
    })
}

exports.genre_detail = (req,res,next)=>{
    Album.find({genre:req.params.id}).populate("artist genre songs").exec((err,results)=>{
        if(err) return next(err)
        res.render('genre_detail', { title: `Albums for ${results[0].genre.name}`,error:err,albums:results });
    })
}
