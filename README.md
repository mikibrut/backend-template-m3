# Bandmates REST API
## Description

This is a the backend repository for the React application `Bandmates`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

### User

Users in the database have the following properties:

```js
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
    }

```
Mates in the database have the following properties:

```js
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: [String],
        enum: ['musician', 'sound technician', 'manager', 'producer', 'sound engineer', 'light technician'],
        default: 'musician'
    },
    image: {
        type: String
    },
    genre:{
        type: String,
    },
    musicalGenre:{
        type: [String],
        enum: ['rock', 'fusion', 'flamenco', 'pop', 'hip hop', 'jazz', 'blues', 'country', 'classical', 'metal', 'folk', 'electronic', 'reggae', 'latin', 'world', 'other'],
        default: 'other'
    },
    musicalInstrument:{
        type: [String],
        enum: ['guitar', 'bass', 'drums', 'brass', 'strings', 'voice', 'piano', 'synth', 'folkloric', 'percussion', 'keys', 'other']
    },
    location: {
        type: String,
        required: true
    },
    links:{
        type: [String]
    }

```
Bands in the database have the following properties:

```js

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
    },
    location: {
      type: String,
      required: true
    },
    links:{
      type: [String]
    }

```
Places in the database have the following properties:

```js

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
    },
    links:{
      type: [String]
    }

```
Adverts in the database have the following properties:

```js

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

```
Comments in the database have the following properties:

```js

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
    }
```
---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |
|-|-|-|-|-|
| GET Mates         | GET        | /api/v1/mates      |   | Public  |
| GET One Mate      | GET        | /api/v1/mates/:mateId | {mateId} | Private |
| GET Mates by creator | GET     | /api/v1/mates/creator/:creatorId | {creatorId} | Private |
| POST Create Mate | POST        | /api/v1/mates/create | {body} |Private |
| PUT Edit Mate    | PUT         | /api/v1/mates/edit/:mateId | {mateId, body} | Private |
| DELETE Delete Mate | DELETE    | /api/v1/mates/:mateId    | {mateId} | Private |
|-|-|-|-|-|
| GET Bands         | GET        | /api/v1/bands      |   | Public  |
| GET One Band      | GET        | /api/v1/bands/:bandId | {bandId} | Private |
| GET Bands by creator | GET     | /api/v1/bands/creator/:creatorId | {creatorId} | Private |
| POST Create Band | POST        | /api/v1/bands/create | {body} |Private |
| PUT Edit Band    | PUT         | /api/v1/bands/edit/:bandId | {bandId, body} | Private |
| DELETE Delete Band | DELETE    | /api/v1/bands/:bandId    | {bandId} | Private |
|-|-|-|-|-|
| GET Places         | GET        | /api/v1/places      |   | Public  |
| GET One Place      | GET        | /api/v1/places/:placeId | {placeId} | Private |
| GET Places  by creator | GET     | /api/v1/places/creator/:creatorId | {creatorId} | Private |
| POST Create Place  | POST        | /api/v1/places/create | {body} |Private |
| PUT Edit Place     | PUT         | /api/v1/places/edit/:placeId | {placeId, body} | Private |
| DELETE Delete Place  | DELETE    | /api/v1/places/:placeId    | {placeId} | Private |
|-|-|-|-|-|
| GET Adverts         | GET        | /api/v1/adverts      |   | Public  |
| GET One Advert      | GET        | /api/v1/adverts/:advertId | {advertId} | Private |
| POST Create Advert  | POST        | /api/v1/adverts/create | {body} |Private |
| PUT Edit Advert     | PUT         | /api/v1/adverts/edit/:advertId | {advertId, body} | Private |
| DELETE Delete Advert  | DELETE    | /api/v1/adverts/:advertId    | {advertId} | Private |
| POST Create Advert Comment | POST  | /api/v1/adverts/:advertId/comments/create | {advertId, body} | Private |
|-|-|-|-|-|
| GET Comments by Advert | GET   | /api/v1/comments/:advertId | {advertId} | Private |
| DELETE Comment | DELETE  | /api/v1/comments/:commentId  | {commentId} | Private |
---

## Useful links

- [Presentation slides](https://docs.google.com/presentation/d/1V6tZabPJYY1sYqUBFBPSbMqYPy1HyildeBlgsUyq8OY/edit?usp=sharing)
- [Frontend repository](https://github.com/mikibrut/frontend-template-m3)
- [Frontend deploy](https://bandmates.netlify.app/)
- [Deployed REST API](https://fly.io/apps/bandmate)

