const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const mateSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician', 'film maker'],
        default: 'musician'
      },
      image: {
        type: String
      },
      genre:{
        type: String,
        enum: ['female', 'male', 'other'],
      },
      musicalGenre:{
        type: String,
        enum: ['rock', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'],
        default: 'other'
      },
      musicalInstrument:{
        type: String,
        enum: ['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'other']
      }
    },
      {
        timestamps: true
      });
    
    module.exports = model("Mate", mateSchema);