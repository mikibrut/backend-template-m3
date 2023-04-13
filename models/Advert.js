const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const advertSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:{
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type:{
    type: String,
    enum: ['mate looking for mate', 'mate looking for band','mate looking for place', 'band looking for band', 'band looking for mate', 'band looking for place', 'place looking for band', 'place looking for mate'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
    {
      timestamps: true
    });
  
  module.exports = model("Advert", advertSchema);