/* **Rating Model**:
​
The Rating model represents a user's rating and comment for a specific movie. It has the following fields:
​
  * movie: A reference to a Movie document, representing the movie being rated.
  * user: A reference to a User document, representing the user who left the rating.
  * rating: A required number representing the rating given by the user for the movie. The rating is on a scale of 1 to 5.
  * comment: An optional string representing the comment or review left by the user for the movie. */

import mongoose from "mongoose";
import IRating from "../interfaces/RatingInterface.js";

const RatingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

const RatingModel = mongoose.model<IRating>("Rating", RatingSchema);

export default RatingModel;
