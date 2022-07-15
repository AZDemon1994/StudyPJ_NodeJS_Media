const router = require('express').Router();
const controller = require('../controllers/post');
const { validateToken, validateBody } = require('../utils/validator');
const { PostSchema } = require('../utils/schema');
const { saveFile } = require('../utils/gallery');

router.get("/", controller.all);
router.post("/", validateToken, saveFile, validateBody(PostSchema), controller.post);

router.get('/bycat/:id', controller.byCatId);
router.get('/byuser/:id',controller.byUserId);

router.route("/:id")
   .get(controller.get)
   .patch(validateToken, controller.patch)
   .delete(validateToken, controller.drop);

module.exports = router;