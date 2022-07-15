const router = require('express').Router();
const controller = require('../controllers/cat');
const { saveFile } = require('../utils/gallery');
const { AddCat, AllSchema } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator');

router.get('/', controller.all);
router.post('/', [saveFile, validateBody(AddCat), controller.add]);

router.route('/:id')
   .get(validateParam(AllSchema.id, "id"), controller.get)
   .patch([saveFile, validateBody(AllSchema.image), controller.patch])
   .delete(validateParam(AllSchema.id, "id"),controller.drop)


// .patch(validateParam(AllSchema.id,"id"),controller.patch)

module.exports = router;