const express= require("express");
const cors=require("cors");
const dotenv=require("dotenv")
const mongoose= require("mongoose");
const app=express();
const port= process.env.PORT || 7000

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URL}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>console.log("connnected to database")).catch((err)=>console.log(err));

// mongoose
//   .connect(  
//     "",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("connnected to database"))
//   .catch((err) => console.log(err));



const userRoutes=require("./routes/UserRoutes");
app.use("/api/user",userRoutes);



app.listen(port,console.log("connected to the port"));