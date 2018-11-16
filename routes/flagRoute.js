const flagRouter = require("express").Router();
const {updateFlag, isFlagGenerated, flagCaptured, updateZoneLocation } = require("../controllers/flagCont")

flagRouter.patch('/:username', updateFlag);
flagRouter.get('/:username', isFlagGenerated)
flagRouter.patch('/:username/capture', flagCaptured)
flagRouter.patch('/:username/zone', updateZoneLocation)

module.exports = flagRouter;