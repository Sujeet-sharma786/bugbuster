const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const cors = require("cors");
require("./DB/config");
const dotenv = require("dotenv");
dotenv.config();

const DoubtModel = require("./DB/doubtandsolution.js");
const AdminModel = require("./DB/admins.js")

app.use(express.json());
app.use(cors());

app.get("/viewdoubts", async (req, resp) => {
  let data = await DoubtModel.find();
  if (data) {
    resp.send(data);
  } else {
    console.log("data not found");
  }
});

app.get("/answerthequestion/:id", async (req, resp) => {
  const my_doubt = await DoubtModel.findOne(req.params._id);
  if (my_doubt) {
    resp.send([my_doubt]);
  } else {
    resp.send("Doubt not found...");
  }
});

// RaiseHand API
app.put("/handraise/:id", async (req, resp) => {
  let hand_raised_doubt = await DoubtModel.findOne(req.params._id);
  console.log(req.params._id);
  let count = hand_raised_doubt.handRaise;
  let result = await DoubtModel.updateOne(
    { _id: req.params.id },
    { $set: { handRaise: count + 1 } }
  );
  count = 0;
  console.log(result);
});

app.post("/postquestion", async (req, resp) => {
  let newDoubtModel = new DoubtModel(req.body);
  let result = await newDoubtModel.save();
  resp.send(result);
});

app.post("/postanswer/:id", async (req, resp) => {
  let result = DoubtModel.insert();
});

app.put("/postanswer/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(req.params.id);
  const newAnswer = { ans: req.body.solution }; // Create a new answer object

  try {
    const Doubt = await DoubtModel.findById(id);
    if (!Doubt) {
      return resp.status(404).json({ message: "Doubt not found" });
    }
    console.log(Doubt);
    Doubt.solution.push(newAnswer); // Add the new answer to the solution array

    const updatedDoubt = await Doubt.save();

    resp.status(200).json(updatedDoubt);
  } catch (error) {
    resp.status(500).json({ message: "Server error", error: error.message });
  }
});
app.get("/answer/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(id);
  const my_Ans = await DoubtModel.findById(id);
  console.log(my_Ans.solution);
  const respVal = {id:id,answers:my_Ans.solution}
  resp.send(respVal);
});

// app.put("/product/:id", verifyToken, async (req, resp) => {
//   // resp.send("Put is working")
// l
//   let result = await ProductModel.updateOne(
//     { _id: req.params.id },
//     { handRaise:}
//   );
//   resp.send(result);
// });
app.post("/sendEmail", (req, res) => {
  var Transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
  let Recever_Email = ["0211cse092@niet.co.in","0211cse082@niet.co.in"]
  for(let i=0;i<Recever_Email.length;i++){
    var mailOptions = {
      from: process.env.EMAIL, // sender address (who sends)
      to: Recever_Email[i], // list of receivers (who receives)
      subject: "New WebSite Building Request from"+req.body.Email, // Subject line
      html: 
      `
      <h3>Email: ${req.body.Email}</h3>
      <h3>Email: ${req.body.ContactNo}</h3>
      <div>
      ${req.body.Desc}
      </div>
      ` // html body
    };
    Transport.sendMail(mailOptions);
  }
  res.send({ status: "ok" });
});

//fetch admin id 
app.post("/adminuniqueid", async (req, resp) => {
  let newadmin = new AdminModel(req.body);
  let result = await newadmin.save();
  resp.send(result);
});

app.get("/getuniqueid/:id",async(req,resp)=>{
  let id = req.params.id;
  console.log(id)
  let admin = await AdminModel.findById(id);    
  if(admin){
    resp.send({result:"admin found"})
  }  else{
    resp.send({result:"admin not found"})
  }
})
app.post("/admin",async(req,resp)=>{
  console.log(req.body.user)
  try{
    const data = await AdminModel.find();
    if(data.user === req.body.user){
      resp.send({message:"Done"});
    }else{
      resp.send({message:"user not found"})
    }
  }catch(err){
    console.log("error occured: ",err)
  }
})

app.listen(process.env.PORT);
