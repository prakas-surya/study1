const router = require('express').Router();
const verify = require('./veriftToken');

router.get ('/',verify, (req,res) => {
    res.send("vaada mayiru"); 

});
module.exports = router;
