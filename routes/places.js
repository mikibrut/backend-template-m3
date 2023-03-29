const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { isAuthenticated } = require('../middlewares/jwt');

    /* GET all PLACES */
    /* ROUTE /places */
    /* Public *//* TESTED ON POSTMAN - WORKING */
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
    /* TESTED ON POSTMAN - WORKING */
router.get('/:placeId', async function (req, res, next) {
    const { placeId } = req.params;
    try {
      const place = await Place.findById(placeId).populate('creator');
      res.status(200).json(place);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new PLACE */
    /* ROUTE /places */
    /* TESTED ON POSTMAN - WORKING */
router.post('/', isAuthenticated, async function (req, res, next) {
    const { placeName, description, image, type} = req.body;
    const creator = req.payload._id;

    try {
      const createdPlace = await Place.create({placeName, description, image, type, creator: creator});
      res.status(200).json(createdPlace);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit PLACE */
    /* ROUTE /places/:placeId */

router.put('/:placeId', isAuthenticated, async function (req, res, next) {
    const { placeId } = req.params;
    const creator = req.payload._id;
    try {
        const place = await Place.findById(placeId);

        if(place.creator.toString() !== creator) {
          return res.status(401).json({message: 'Not authorized to edit this Place'})
        }
        
        const updated = await Place.findByIdAndUpdate(placeId, req.body, {new: true});
        res.status(201).json(updated);
        } catch (error) {
          next(error)
        }
      });

    /* DELETE delete PLACE */
    /* ROUTE /places/:placeId */
    /* TESTED ON POSTMAN - WORKING */
router.delete('/:placeId', isAuthenticated, async function (req, res, next){
  const { placeId } = req.params;
  const creator = req.payload._id;
 
  try {
      const place = await Place.findById(placeId);

      if(place.creator.toString() !== creator) {
        return res.status(401).json({message: 'Not authorized to delete this Place'})
      }

      const deletedPlace = await Place.findByIdAndDelete(placeId)
      res.status(201).json(deletedPlace)
    } catch (error) {
        next(error)
    }
})



module.exports = router;