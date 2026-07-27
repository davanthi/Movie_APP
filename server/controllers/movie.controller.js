const Movie = require("../models/movie.model.js");
const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New movie has been added!",
    });
  } catch (error) {
    res.send({
      error: error,
      success: false,
      message: "Movie Could not be added",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.send({
      success: true,
      message: "The movie has been updated!",
      data: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
module.exports={
 addMovie,updateMovie
}