const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const advertSchema = new Schema({
  band: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Band',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
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