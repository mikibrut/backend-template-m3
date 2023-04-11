const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const placeSchema = new Schema({
 creator:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
 },
 placeName:{
    type: String,
    required: true
 },
 description: {
    type: String,
    required: true
 },
 image:{
    type: String
 },
 type: {
    type: [String],
    enum: ['venue', 'concert hall', 'rehearsal rooms', 'recording studio', 'music-bar', 'other'],
    required: true
 },
 location: {
   type: String,
   required: true
 }
},
    {
      timestamps: true
    });
  
  module.exports = model("Place", placeSchema);