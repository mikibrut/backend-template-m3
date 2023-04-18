const express = require('express');
const router = express.Router();
const Advert = require('../models/Advert');
const Comment = require('../models/Comment');
const {isAuthenticated} = require('../middlewares/jwt')


    /* GET all MATES */
    /* ROUTE /mates */
    /* Public */
    /* TESTED ON POSTMAN - WORKING */
 router.get('/', async function (req, res, next) {
    try {
      const adverts = await Advert.find({}).populate('creator');
      res.status(200).json(adverts);
    } catch (error) {
      next(error)
    }
  });

    /* GET one ADVERTS */
    /* ROUTE /adverts/:advertId */
    /* TESTED ON POSTMAN - WORKING */
router.get('/:advertId', async function (req, res, next) {
    const { advertId } = req.params;
    try {
      const advert = await Advert.findById(advertId).populate('creator');
      res.status(200).json(advert);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new ADVERT */
    /* ROUTE /adverts/create */
    /* TESTED ON POSTMAN - WORKING */
router.post('/create', isAuthenticated, async function (req, res, next) {
    const { title, message, type, location} = req.body;
    const creator = req.payload._id;

    try {
      const createdAdvert = await Advert.create({title, message, type, location, creator: creator});
      res.status(200).json(createdAdvert);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit ADVERT */
    /* ROUTE /adverts/edit/:advertId */
    /* TESTED ON POSTMAN - WORKING */
router.put('/edit/:advertId', isAuthenticated, async function (req, res, next) {
    const { advertId } = req.params;
    const creator = req.payload._id;
    try {
        const advert = await Advert.findById(advertId)

        if(advert.creator.toString() !== creator) {
          return res.status(401).json({message: 'Not authorized to edit this Advert'});
        }

        const updated = await Advert.findByIdAndUpdate(advertId, req.body, {new: true});
        res.status(201).json(updated);
      } catch (error) {
        next(error)
      }
    });

    /* DELETE delete ADVERT */
    /* ROUTE /adverts/:advertId */
    /* TESTED ON POSTMAN - WORKING */
router.delete('/:advertId',  isAuthenticated, async function (req, res, next){
    const { advertId } = req.params;
    const creator = req.payload._id;
    try {
        const advert = await Advert.findById(advertId);

        if(advert.creator.toString() !== creator){
          return res.status(401).json({ message: 'Not authorized to delete this Advert' });
        }

        const deletedAdvert = await Advert.findByIdAndDelete(advertId)
        res.status(201).json(deletedAdvert)
    } catch (error) {
        next(error)
    }
})


/*--COMMENTS---*/


/* POST create new comment for an Advert */
  /* ROUTE /adverts/:advertId/comments/create */
  /* TESTED ON POSTMAN - WORKING */
  router.post('/:advertId/comments/create', isAuthenticated, async function (req, res, next) {
    const { advertId } = req.params;
    const { title, text } = req.body;
    const creator = req.payload._id;
  
    try {
      const createdComment = await Comment.create({ title, text, creator: creator, advert: advertId });
      res.status(200).json(createdComment);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;