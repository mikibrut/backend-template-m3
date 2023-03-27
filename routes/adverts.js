const express = require('express');
const router = express.Router();
const Advert = require('../models/Advert');


/* GET all ADVERTS */
 /* ROUTE /adverts */

 router.get('/', async function (req, res, next) {
    try {
      const adverts = await Advert.find({})
      res.status(200).json(adverts);
    } catch (error) {
      next(error)
    }
  });

    /* GET one ADVERTS */
    /* ROUTE /adverts/:advertId */
router.get('/:advertId', async function (req, res, next) {
    const { advertId } = req.params;
    try {
      const advert = await Advert.findById(advertId);
      res.status(200).json(advert);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new ADVERT */
    /* ROUTE /adverts */
router.post('/', async function (req, res, next) {
    try {
      const createdAdvert = await Advert.create(req.body);
      res.status(200).json(createdAdvert);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit ADVERT */
    /* ROUTE /adverts/:advertId */

router.put('/:advertId', async function (req, res, next) {
    const { advertId } = req.params;
        try {
          await Advert.findByIdAndUpdate(advertId, req.body, {new: true});
          res.redirect(`/adverts/${advertId}`);
        } catch (error) {
          next(error)
        }
      });

    /* DELETE delete ADVERT */
    /* ROUTE /adverts/:advertId */

router.delete('/:advertId', async function (req, res, next){
    const { advertId } = req.params;
    try {
        const deletedAdvert = await Advert.findByIdAndDelete(advertId)
        res.status(201).json(deletedAdvert)
    } catch (error) {
        next(error)
    }
})



module.exports = router;