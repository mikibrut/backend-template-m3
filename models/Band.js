const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const bandSchema = new Schema({
 creator:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 },
 bandName:{
    type: String,
    required: true
 },
 bio: {
    type: String,
    required: true
 },
 image:{
    type: String
 },
 musicalGenre: {
    type: [String],
    enum: ['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'],
    default: 'other',
    required: true
 }
//  members:{
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'User',
//     required: true
//  }
 },
    {
      timestamps: true
    });
  
  module.exports = model("Band", bandSchema);