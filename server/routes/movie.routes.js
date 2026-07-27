const express = require("express");
const Movie=require('../models/movie.model.js');
const {addMovie,updateMovie}=require('../controllers/movie.controller.js')
const movieRouter = express.Router(); 
movieRouter.post("/add-movie", addMovie);
//update movie
movieRouter.put("/update-movie/:id", updateMovie);
//delete movie
movieRouter.delete("/delete-movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    res.send({
      success: true,
      message: "movie deleted Successfully",
      data: deletedMovie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "server Error  movie could not be deleted",
    });
  }
});
// get all Movies
movieRouter.get("/all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched!",
      data: allMovies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// get a specific Movie

movieRouter.get('/:id' , async(req , res)=>{
    try {
        const movie = await Movie.findById(req.params.id)
         res.send({
            success: true,
            message: "Movie fetched successfully!",
            data: movie
        })
    } catch (error) {
           res.send({
            success: false,
            message: err.message
        })
    }
})
module.exports=movieRouter