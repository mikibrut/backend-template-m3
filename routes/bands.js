const express = require('express');
const router = express.Router();
const Band = require('../models/Band');

/* GET all BANDS */
 /* ROUTE /bands */

 router.get('/', async function (req, res, next) {
    try {
      const bands = await Band.find({})
      .populate("members")
      res.status(200).json(bands);
    } catch (error) {
      next(error)
    }
  });

    /* GET one BANDS */
    /* ROUTE /bands/:bandId */
router.get('/:bandId', async function (req, res, next) {
    const { bandId } = req.params;
    try {
      const band = await Band.findById(bandId);
      res.status(200).json(band);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new BAND */
    /* ROUTE /bands */
router.post('/', async function (req, res, next) {
    try {
      const createdBand = await Band.create(req.body);
      res.status(200).json(createdBand);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit BAND */
    /* ROUTE /bands/:bandId */

router.put('/:bandId', async function (req, res, next) {
    const { bandId } = req.params;
        try {
          await Band.findByIdAndUpdate(bandId, req.body, {new: true});
          res.redirect(`/bands/${bandId}`);
        } catch (error) {
          next(error)
        }
      });

    /* DELETE delete BAND */
    /* ROUTE /bands/:bandId */

router.delete('/:bandId', async function (req, res, next){
    const { bandId } = req.params;
    try {
        const deletedBand = await Band.findByIdAndDelete(bandId)
        res.status(201).json(deletedBand)
    } catch (error) {
        next(error)
    }
})



module.exports = router;