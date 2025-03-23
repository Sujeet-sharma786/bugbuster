const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true, 
  useUnifiedTopology: true,
})
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log("MongoDB connection error: ",err));
