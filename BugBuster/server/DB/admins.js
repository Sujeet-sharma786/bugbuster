const mongoose = require("mongoose");
const Admins = new mongoose.Schema({
  // ADMIN_UNIQUE_ID:[]
  user:String,
  password:String
});

const AdminModel = mongoose.model("admins", Admins);
module.exports = AdminModel;
