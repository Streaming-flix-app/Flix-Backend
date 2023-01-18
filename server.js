const express= require("express");
const cors=require("cors");
const mongoose= require("mongoose");
const app=express();
const port= process.env.PORT || 7000

app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/netflix-List",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

// }).then(()=>console.log("connnected to database")).catch((err)=>console.log(err));

mongoose
  .connect(  
    "mongodb+srv://riderAtlas:riderAtlas@netflixdata.ssd6ifw.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connnected to database"))
  .catch((err) => console.log(err));

const userRoutes=require("./routes/UserRoutes");
app.use("/api/user",userRoutes);



app.listen(port,console.log("connected to the port"));