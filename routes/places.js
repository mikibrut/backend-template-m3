const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { isAuthenticated } = require('../middlewares/jwt');
const fileUploader = require("../config/cloudinary.config");

    /* GET all PLACES */
    /* ROUTE /places */
    /* Public */
    /* TESTED ON POSTMAN - WORKING */
 router.get('/', async function (req, res, next) {
    try {
      const places = await Place.find({}).populate('creator');
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

    /* GET place creator */
    /* ROUTE /places/creator/:creatorId */
    /* TESTED ON POSTMAN - WORKING */
router.get('/creator/:creatorId',  isAuthenticated, async function (req, res, next) {
  const creator = req.params.creatorId;
  try {
    const places = await Place.find({ creator: creator }).populate('creator');
    res.status(200).json(places);
  } catch (error) {
    next(error)
  }
});

    /* POST create new PLACE */
    /* ROUTE /places/create */
    /* TESTED ON POSTMAN - WORKING */
router.post('/create', isAuthenticated, async function (req, res, next) {
    const { placeName, description, image, type, location} = req.body;
    const creator = req.payload._id;

    try {
      const createdPlace = await Place.create({placeName, description, image, type, location, creator: creator});
      res.status(200).json(createdPlace);
    } catch (error) {
      next(error)
    }
  });

  router.post('/upload', isAuthenticated, fileUploader.single('image'), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

  
    /* PUT edit PLACE */
    /* ROUTE /places/edit/:placeId */

router.put('/edit/:placeId', isAuthenticated, async function (req, res, next) {
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