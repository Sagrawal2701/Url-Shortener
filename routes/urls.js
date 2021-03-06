const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
const utils = require('../utils/utils');
require('dotenv').config({ path: '../config/.env' });

// Short URL Generator
router.post('/short', async (req, res) => {
    var origUrl = req.body.url;
    var pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(origUrl)) {
      origUrl = "http://" + origUrl;
    }
    const base = process.env.BASE;
    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          res.json(url.shortUrl);
        } else {
          const shortUrl = `${base}/${urlId}`;
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });
  
          await url.save();
          console.log(shortUrl);
          res.json(shortUrl);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    } else {
      res.status(400).json('Invalid Original Url');
    }
  });
  
  module.exports = router;