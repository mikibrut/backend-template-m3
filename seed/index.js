require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const User = require('../models/User');
const Band = require('../models/Band');
const Advert = require('../models/Advert');
const Mate = require('../models/Mate');
const Place = require('../models/Place')

const users = [
  {
    email: "manu-guitar@gmail.com",
    hashedPassword: "$2a$10$6TRG1jD4Xblj5ZeQhLMFAegPSd0vSIze.6yjLprXru9QIud7f/6Ka",
    username: "Manuguitar",
    role: "user",
    type: "musician",
    image: "https://img.freepik.com/free-photo/guitarist-man-playing-guitar-home_144627-28083.jpg?w=2000",
    genre: "male",
    musicalGenre: "jazz",
    musicalInstrument: "guitar"
  },
  {
    email: "eva-producer@gmail.com",
    hashedPassword: "$2a$10$znkWdynmoRJaxHOrfFmzrudsXRktSCYfJzXh.zQge1Sip4p2FO5Sq",
    username: "Eva",
    role: "user",
    type: "producer",
    image: "https://media.gettyimages.com/id/74075510/es/foto/mujer-usando-mezcla-escritorio.jpg?s=612x612&w=gi&k=20&c=9J8xn1UZVbVWDe3lruXiA_nNZxpmT9qBd1dFPdjaJYs=",
    genre: "female",
    musicalGenre: "electronic",
    musicalInstrument: "synth"
  },
];

const bands = [
{
  bandName: "Manu quartet",
  bio: "mau quartet is a jazz quartet that plays classic jazz standards",
  image: "https://www.msmusic.co.uk/images/jazzquartet1.jpg",
  musicalGenre: "jazz",
  members: "64216e61dd53aa5b5ee03024"
}
];

const adverts = [
{
  band: "64216f643e88645cdd0139a4",
  user: "64216e61dd53aa5b5ee03024",
  message: "Manu's quartet is searching for an upright bass player for playing classic jazz standards, no reading music skills required but medium level and impro skills preffered"
}
];

const mates = [
{
  user: "64216e61dd53aa5b5ee03024",
  type: "musician",
  image: "https://img.freepik.com/free-photo/guitarist-man-playing-guitar-home_144627-28083.jpg?w=2000",
  genre: "male",
  musicalGenre: "jazz",
  musicalInstrument: "guitar"
}
]

const places = [
{
  placeName: "rock-sound",
  description: "the noissiest place in poblenou. beers and rock and roll til 3am",
  image: "https://www.mondosonoro.com/wp-content/uploads/2020/09/Rocksound.jpg",
  type: "music-bar",
  creator: "641ee0484466751559b339d1"
}
]
mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Place.create(places)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

// Run npm run seed 