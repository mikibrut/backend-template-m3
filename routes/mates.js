const express = require('express');
const router = express.Router();
const Mate = require('../models/Mate');

 /* GET all MATES */
 /* ROUTE /mates */

router.get('/', async function (req, res, next) {
    try {
      const mates = await Mate.find({})
      res.status(200).json(mates);
    } catch (error) {
      next(error)
    }
  });

    /* GET one MATE */
    /* ROUTE /mates/:mateId */
router.get('/:mateId', async function (req, res, next) {
    const { mateId } = req.params;
    try {
      const mate = await Mate.findById(mateId);
      res.status(200).json(mate);
    } catch (error) {
      next(error)
    }
  });

    /* POST create new MATE */
    /* ROUTE /mates */
router.post('/', async function (req, res, next) {
    try {
      const createdMate = await Mate.create(req.body);
      res.status(200).json(createdMate);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit MATE */
    /* ROUTE /mates/:showId */

router.put('/:mateId', async function (req, res, next) {
    const { mateId } = req.params;
        try {
          await Mate.findByIdAndUpdate(mateId, req.body, {new: true});
          res.redirect(`/mates/${mateId}`);
        } catch (error) {
          next(error)
        }
      });

    /* DELETE delete MATE */
    /* ROUTE /mates/:mateId */

router.delete('/:mateId', async function (req, res, next){
    const { mateId } = req.params;
    try {
        const deletedMate = await Mate.findByIdAndDelete(mateId)
        res.status(201).json(deletedMate)
    } catch (error) {
        next(error)
    }
})



module.exports = router;