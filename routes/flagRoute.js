const flagRouter = require("express").Router();
const {updateFlag, isFlagGenerated, flagCaptured} = require("../controllers/flagCont")

flagRouter.patch('/:username', updateFlag);
flagRouter.get('/:username', isFlagGenerated)
flagRouter.patch('/:username/capture', flagCaptured)

module.exports = flagRouter;