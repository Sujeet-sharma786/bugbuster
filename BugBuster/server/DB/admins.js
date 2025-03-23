const mongoose = require("mongoose");
const Admins = new mongoose.Schema({
  ADMIN_UNIQUE_ID:[]
});

const AdminModel = mongoose.model("admins", Admins);
module.exports = AdminModel;
