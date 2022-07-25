const async = require('async');
var Song = require('../models/song');
var Artist = require('../models/artist');
var Genre = require('../models/genre');
var Album = require('../models/album');

exports.album_detail = (req,res,next)=>{
    Album.find({_id:req.params.id}).populate("artist genre songs").exec((err,results)=>{
        if(err) return next(err)
        console.log(results);
        res.render("album_detail",{title:results.title, error:err,album:results})
    })
}