const express = require('express');
const router = express.Router();
const Advert = require('../models/Advert');
const Comment = require('../models/Comment');
const { isAuthenticated } = require('../middlewares/jwt');


/* GET all comments for an Advert */
/* ROUTE /comments/:advertId */
/* Public */
/* TESTED ON POSTMAN - WORKING */
router.get('/:advertId', async function (req, res, next) {
    const { advertId } = req.params;
    try {
      const comments = await Comment.find({ advert: advertId }).populate('creator');
      res.status(200).json(comments);
    } catch (error) {
      next(error)
    }
  });
  
  /* POST create new comment for an Advert */
  /* ROUTE /comments/:advertId/create */
  /* TESTED ON POSTMAN - WORKING */
  router.post('/:advertId/create', isAuthenticated, async function (req, res, next) {
    const { advertId } = req.params;
    const { title, text } = req.body;
    const creator = req.payload._id;
  
    try {
      const advert = await Advert.findById(advertId);
      if (!advert) {
        return res.status(404).json({ message: 'Advert not found' });
      }
  
      const createdComment = await Comment.create({ title, text, creator, advert: advertId });
      res.status(200).json(createdComment);
    } catch (error) {
      next(error);
    }
  });
  
  /* PUT edit comment for an Advert */
  /* ROUTE /comments/:advertId/edit/:commentId */
  /* TESTED ON POSTMAN - WORKING */
  router.put('/:advertId/edit/:commentId', isAuthenticated, async function (req, res, next) {
    const { advertId, commentId } = req.params;
    const { title, text } = req.body;
    const creator = req.payload._id;
  
    try {
      const advert = await Advert.findById(advertId);
      if (!advert) {
        return res.status(404).json({ message: 'Advert not found' });
      }
  
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      if (comment.creator.toString() !== creator) {
        return res.status(401).json({ message: 'Not authorized to edit this comment' });
      }
  
      const updatedComment = await Comment.findByIdAndUpdate(commentId, { title, text }, { new: true });
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  });
  
  /* DELETE comment */
  /* ROUTE /comments/:commentId */
  /* TESTED ON POSTMAN - WORKING */
  router.delete('/:commentId', isAuthenticated, async function (req, res, next) {
    const { commentId } = req.params;
    const creator = req.payload._id;
  
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      if (comment.creator.toString() !== creator) {
        return res.status(401).json({ message: 'Not authorized to delete this comment' });
      }
  
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'Server error' });
  }
  });
  
  

  module.exports = router;