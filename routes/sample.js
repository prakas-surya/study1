const router = require('express').Router();
const verify = require('./veriftToken');

router.get ('/',verify, (req,res) => {
    res.send(req.post); 

});
module.exports = router;