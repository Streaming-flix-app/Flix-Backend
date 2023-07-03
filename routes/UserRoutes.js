const {addToLikeMovies, getMovies, deleteMovies, Xcription} =require("../controlers/UserControler");
const router= require("express").Router();

router.post("/add",addToLikeMovies);
router.get("/get/:email",getMovies);
router.post("/delete/:email/:id",deleteMovies);
router.get("/order/:email/:id",Xcription);

   
module.exports=router;