const flagRouter = require("express").Router();
const {updateFlag, isFlagGenerated, flagCaptured, updateZoneLocation, patchFlagCount } = require("../controllers/flagCont")

flagRouter.patch('/:username', updateFlag);
flagRouter.get('/:username', isFlagGenerated)
flagRouter.patch('/:username/capture', flagCaptured)
flagRouter.patch('/:username/zone', updateZoneLocation)
flagRouter.patch('/:username/count', patchFlagCount)

module.exports = flagRouter;