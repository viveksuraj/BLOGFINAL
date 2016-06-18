var express = require('express');
var router = express.Router();
var places = require('../../../models/Places/Places');








router.route('/Places')
.get(function(req, res){
  places.find({},function(err,data){
    if(err){
      console.log("Error="+err);
    }
    res.send(JSON.stringify(data));
  });
});

router.route('/ViewPlaces')
  .post(function(req, res) {
        var Places = new Places();
        Places.Name = req.Title;
        Places.Location = req.Location;
        Places.Poster=req.body.Poster;
        Places.save(function(err) {
            if (err)
            {
                res.send(err);
            res.json({ message: 'Places added!' });
            }
            else {
              res.send(err);
            }
            });
    res.redirect("/");
  });


module.exports= router;
