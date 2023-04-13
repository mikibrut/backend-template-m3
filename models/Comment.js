const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  text: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  advert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advert',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},
{
  timestamps: true
});

module.exports = model("Comment", commentSchema);