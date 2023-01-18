const {addToLikeMovies, getMovies, deleteMovies} =require("../controlers/UserControler");
const router= require("express").Router();

router.post("/add",addToLikeMovies);
router.get("/get/:email",getMovies);
router.post("/delete/:email/:id",deleteMovies);


module.exports=router;