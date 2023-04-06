const express = require('express');
const router = express.Router();
const Band = require('../models/Band');
const {isAuthenticated} = require('../middlewares/jwt')

 /* GET all MATES */
    /* ROUTE /mates */
    /* Public */
    /* TESTED ON POSTMAN - WORKING */
 router.get('/', async function (req, res, next) {
    try {
      const bands = await Band.find({})
        .populate('creator');
      res.status(200).json(bands);
    } catch (error) {
      next(error)
    }
  });

    /* GET one BANDS */
    /* ROUTE /bands/:bandId */
    /* TESTED ON POSTMAN - WORKING */
router.get('/:bandId', async function (req, res, next) {
    const { bandId } = req.params;
    try {
      const band = await Band.findById(bandId)
        .populate('creator')
      res.status(200).json(band);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new BAND */
    /* ROUTE /bands */
    /* TESTED ON POSTMAN - WORKING */
router.post('/create', isAuthenticated, async function (req, res, next) {
    const { bandName, bio, image, musicalGenre } = req.body;
    const creator = req.payload._id;

    try {
      const createdBand = await Band.create({ bandName, bio, image, musicalGenre, creator: creator});
      res.status(200).json(createdBand);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit BAND */
    /* ROUTE /bands/:bandId */
    /* TESTED ON POSTMAN - WORKING */
router.put('/edit/:bandId', isAuthenticated, async function (req, res, next) {
    const { bandId } = req.params;
    const creator = req.payload._id;
    try {
        const band = await Band.findById(bandId);

        if(band.creator.toString() !== creator) {
            return res.status(401).json({ message: 'Not authorized to edit this Band' });
        }
         
        const updated = await Band.findByIdAndUpdate(bandId, req.body, {new: true});
          
        res.status(201).json(updated);
        } catch (error) {
          next(error)
        }
      });

    /* DELETE delete BAND */
    /* ROUTE /bands/:bandId */
    /* TESTED ON POSTMAN - WORKING */
router.delete('/:bandId', isAuthenticated, async function (req, res, next){
    const { bandId } = req.params;
    const creator = req.payload._id;
    try {
        const band = await Band.findById(bandId);

        if(band.creator.toString() !== creator) {
            return res.status(401).json({ message: 'Not authorized to delete this Band' });
        }

        const deletedBand = await Band.findByIdAndDelete(bandId)
        res.status(201).json(deletedBand)
    } catch (error) {
        next(error)
    }
})



module.exports = router;