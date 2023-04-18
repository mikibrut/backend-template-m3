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


   /* CLOUDINARY uploader route */
router.post('/upload', isAuthenticated, fileUploader.single('image'), (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
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
    const { type, image, genre, musicalGenre, musicalInstrument, location, links} = req.body;
    const creator = req.payload._id;
    
    try {
      const createdMate = await Mate.create({type, image, genre, musicalGenre, musicalInstrument, location, links, creator: creator});
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
    const { type, image, genre, musicalGenre, musicalInstrument, location, links} = req.body;
    const creator = req.payload._id;
    try {
        const mate = await Mate.findById(mateId);
        if (mate.creator.toString() !== creator) {
          return res.status(401).json({ message: 'Not authorized to edit this Mate' });
        }
        const updated = await Mate.findByIdAndUpdate(mateId, {type, image, genre, musicalGenre, musicalInstrument, location, links}, { new: true });
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
        const mate = await Mate.findById(mateId);
        if (mate.creator.toString() !== creator) {
            return res.status(401).json({ message: 'Not authorized to delete this Mate' });
          }
        const deletedMate = await Mate.findByIdAndDelete(mateId)
        res.status(201).json(deletedMate)
    } catch (error) {
        next(error)
    }
})

module.exports = router;