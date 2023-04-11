const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  // userRole: {
  //   type: [String],
  //   enum: ['Mate', 'Band', 'Place'],
  //   default: []
  // },
},
{
  timestamps: true
});


module.exports = model("User", userSchema);