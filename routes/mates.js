const express = require('express');
const router = express.Router();
const Mate = require('../models/Mate');
const { isAuthenticated } = require('../middlewares/jwt');
const fileUploader = require("../config/cloudinary.config");

    /* GET all MATES */
    /* ROUTE /mates */
    /* Public */
    /* TESTED ON POSTMAN - WORKING */
router.get('/', async function (req, res, next) {
    try {
      const mates = await Mate.find({}).populate('creator');
      res.status(200).json(mates);
    } catch (error) {
      next(error)
    }
  });

    /* GET one MATE */
    /* ROUTE /mates/:mateId */
    /* TESTED ON POSTMAN - WORKING */
router.get('/:mateId',  async function (req, res, next) {
    const { mateId } = req.params;
    try {
      const mate = await Mate.findById(mateId).populate('creator');
      res.status(200).json(mate);
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

    /* GET creator's MATE */
    /* ROUTE /mates/creator/:creatorId */
    /* TESTED ON POSTMAN - WORKING */
router.get('/creator/:creatorId',  isAuthenticated, async function (req, res, next) {
  const creator = req.params.creatorId;
  try {
    const mates = await Mate.find({ creator: creator }).populate('creator');;
    res.status(200).json(mates);
  } catch (error) {
    next(error)
  }
});

    /* POST create new MATE */
    /* ROUTE /mates/create */
    /* TESTED ON POSTMAN - WORKING */
router.post('/create', isAuthenticated, async function (req, res, next) {
    const { type, image, genre, musicalGenre, musicalInstrument, location} = req.body;
    const creator = req.payload._id;
    
    try {
      const createdMate = await Mate.create({type, image, genre, musicalGenre, musicalInstrument, location, creator: creator});
      res.status(200).json(createdMate);
    } catch (error) {
      next(error)
    }
  });



    /* PUT edit MATE */
    /* ROUTE /mates/edit/:mateId */
    /* TESTED ON POSTMAN - WORKING */
router.put('/edit/:mateId', isAuthenticated, async function (req, res, next) {
  console.log('Backend in')
    const { mateId } = req.params;
    const { type, image, genre, musicalGenre, musicalInstrument, location} = req.body;
    const creator = req.payload._id;
    try {
        // Get the Mate document by ID
        const mate = await Mate.findById(mateId);
        // Check if the authenticated user is the creator of the Mate
        if (mate.creator.toString() !== creator) {
          return res.status(401).json({ message: 'Not authorized to edit this Mate' });
        }
    
        // Update the Mate document with the data from the request body
        const updated = await Mate.findByIdAndUpdate(mateId, {type, image, genre, musicalGenre, musicalInstrument, location}, { new: true });
    
        // Send back the updated Mate document as a JSON response
        res.status(201).json(updated);
      } catch (error) {
        next(error);
      }
    });

    /* DELETE delete MATE */
    /* ROUTE /mates/:mateId */
    /* TESTED ON POSTMAN - WORKING */
router.delete('/:mateId', isAuthenticated, async function (req, res, next){
    const { mateId } = req.params;
    const creator = req.payload._id;
    try {
        // Get the Mate document by ID
        const mate = await Mate.findById(mateId);
        // Check if the authenticated user is the creator of the Mate
        if (mate.creator.toString() !== creator) {
            return res.status(401).json({ message: 'Not authorized to delete this Mate' });
          }
        // Delete the Mate document with the data from the matched Id
        const deletedMate = await Mate.findByIdAndDelete(mateId)

        // Send back the updated Mate document as a JSON response
        res.status(201).json(deletedMate)
    } catch (error) {
        next(error)
    }
})



module.exports = router;