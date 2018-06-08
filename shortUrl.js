var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ShortUrlSchema = new Schema({
    original_url: String,
    short_url: String,
    created_at: {type:Date, default:Date.now}   
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema); //ShortUrl -- module name;