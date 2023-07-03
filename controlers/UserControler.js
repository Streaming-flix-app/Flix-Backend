const User=require("../models/UserModel");
const { instance } = require("./Connect_rzp");

module.exports.addToLikeMovies = async(req,res) => {
    try{
        const {email,data} = req.body;
        
        User.findOne({email}).exec(async(error,user)=>{
            if(error)return res.status(400).json({error});
       
              if(user){
                const {likedMovies}=user;
                const movieAlreadyLiked= likedMovies.find(({id})=>  id===data.id);
                if(!movieAlreadyLiked){                   
                 await User.findByIdAndUpdate(
                       user._id,{
                       likedMovies:[...user.likedMovies,data]},
                       {new:true}
                    )
                }else return res.status(400).json({msg:"Movie already added to the liked list."});
              }
              else{
                console.log("here")
                const useR = new User({ email, likedMovies: [data] });
                useR.save((error,data)=>{
                    if(error){
                        return res.status(400).json({error});
                    }
                    if(data){
                        return res.status(200).json({msg:"Movies added successfully"});
                    }
                })
              }
        })
    }catch(error){
        return res.status(400).json({msg:"error while adding movie"});
    }
};


module.exports.getMovies=async(req,res)=>{
    try{
      const {email}=req.params;
        User.findOne({email}).exec((err,user)=>{
        if(err){           
            return res.status(400).json({err});
        }
        if(user){
            return res.status(200).json({ movies: user.likedMovies });
        }
        else{
            return res.status(200).json({msg:"No user Found"});
        }
      })
    }catch(e){
        return res.status(400).json({msg:"unable to fetch",e})
    }

}

module.exports.deleteMovies=async(req,res)=>{
    try{
        const {email,id}=req.params;
        User.findOne({email}).exec(async(err,user)=>{
            if(err){
                return res.status(200).json({err});
            }
            if(user){
                const {likedMovies}=user;
               const result= likedMovies.filter((movie)=> {
                   return !(movie.id == id)
                })
                    // const indx=likedMovies.findIndex(({id})=>id===m)
                
                 User.findByIdAndUpdate(
                  user._id,
                  {
                    likedMovies: [...result]
                  },
                  { new: true }
                ).exec((err,data)=>{
                    if(err) return res.status(400).json({err});
                    if(data){
                        return res.status(200).json({movies:likedMovies});
                    }
                    else{
                        return res.status(400).json({msg:"Not saved"});
                    }
                });
            }
            else{
                return res.status(400).json({msg:"No user found"});
            }

        })

    }catch(e){
        return res.status(400).json({e});
    }
}


module.exports.Xcription=(req,res)=>{
    const amount=[199,499,649];
    const {email,id}=req.params;
//////////////////////////////
      
var options = {
    amount: amount[id],  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
      if(err){
        return res.status(500).json({err});
      }
        return res.status(200).json({order});
  });


    
   
}