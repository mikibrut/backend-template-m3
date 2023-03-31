const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/jwt');


    /* GET one PROFILE */
    /* ROUTE /profile/:profileId */
    /* TESTED ON POSTMAN - WORKING */
router.get('/:profileId',  async function (req, res, next) {
    const { profileId } = req.params;
    try {
      const profile = await User.findById(profileId);
      res.status(200).json(profile);
    } catch (error) {
      next(error)
    }
  });

    /* PUT edit PROFILE */
    /* ROUTE /profile/:profileId */
    /* TESTED ON POSTMAN - WORKING */
router.put('/:profileId', isAuthenticated, async function (req, res, next) {
    const { profileId } = req.params;
    const user = req.payload._id;
    console.log(user)
    try {
        const profile = await User.findById(profileId);
        if (profileId !== user) {
          return res.status(401).json({ message: 'Not authorized to edit this Porfile' });
        }
    
        // Update the Mate document with the data from the request body
        const updated = await User.findByIdAndUpdate(profileId, req.body, { new: true });
    
        // Send back the updated Mate document as a JSON response
        res.status(201).json(updated);
      } catch (error) {
        next(error);
      }
    });

    /* DELETE delete PROFILE */
    /* ROUTE /profile/:profileId */
    
router.delete('/:profileId', isAuthenticated, async function (req, res, next){
    const { profileId } = req.params;
    const user = req.payload._id;
    try {
    
        const profile = await User.findById(profileId);
        if (profileId !== user) {
            return res.status(401).json({ message: 'Not authorized to delete this Profile' });
          }
        
        const deletedProfile = await User.findByIdAndDelete(profileId)
        res.status(201).json(deletedProfile)
    } catch (error) {
        next(error)
    }
})



module.exports = router;