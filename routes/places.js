const express = require('express');
const router = express.Router();
const Place = require('../models/Place');


/* GET all PLACES */
 /* ROUTE /places */

 router.get('/', async function (req, res, next) {
    try {
      const places = await Place.find({})
      res.status(200).json(places);
    } catch (error) {
      next(error)
    }
  });

    /* GET one PLACE */
    /* ROUTE /places/:placeId */
router.get('/:placeId', async function (req, res, next) {
    const { placeId } = req.params;
    try {
      const place = await Place.findById(placeId);
      res.status(200).json(place);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new PLACE */
    /* ROUTE /places */
router.post('/', async function (req, res, next) {
    try {
      const createdPlace = await Place.create(req.body);
      res.status(200).json(createdPlace);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit PLACE */
    /* ROUTE /places/:placeId */

router.put('/:placeId', async function (req, res, next) {
    const { placeId } = req.params;
        try {
          await Place.findByIdAndUpdate(placeId, req.body, {new: true});
          res.redirect(`/places/${placeId}`);
        } catch (error) {
          next(error)
        }
      });

    /* DELETE delete PLACE */
    /* ROUTE /places/:placeId */

router.delete('/:placeId', async function (req, res, next){
    const { placeId } = req.params;
    try {
        const deletedPlace = await Place.findByIdAndDelete(placeId)
        res.status(201).json(deletedPlace)
    } catch (error) {
        next(error)
    }
})



module.exports = router;