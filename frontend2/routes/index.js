var express = require('express');
var ideacard_controller = require('../controllers/IdeaCardController');
var router = express.Router();

/* GET home page. */
router.get('/',ideacard_controller.ideacard_list);
router.get('/:id',ideacard_controller.get_ideacard);
router.post('/:id',ideacard_controller.create_ideacard);

module.exports = router;
