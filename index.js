var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://murad2018:murodjon77@ds147420.mlab.com:47420/ada_url_shortener');
var ShortUrl = require('./shortUrl');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'Welcome to my API' });
});

router.route('/shorturl/new')
    .post(function (req, res) {
        ShortUrl.findOne({ original_url: req.body.original_url },
            function (err, url) {
                if (err) throw res.json(err);
                else {
                    if (url) {
                        res.json({ original_url: url.original_url, short_url: url.short_url })
                    }
                    else {
                        ShortUrl.count(function (err, count) {
                            var newUrl = new ShortUrl();
                            newUrl.original_url = req.body.original_url;
                            newUrl.short_url = count + 1;

                            newUrl.save(function (err) {
                                if (err) {res.send(err);}
                                else{
                                    res.json(newUrl);
                                }
                            })
                        })            
                }
            }
            })            
    })

router.route('/shorturl/:url')
    .get(function (req, res) {
        ShortUrl.findOne({ short_url: req.params.url }, function (err, url) {
            if (err) res.send(err);
            // res.json(url);
            else
                res.redirect(url.original_url);
        })
    })


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);