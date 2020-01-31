const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   instagramId: {
      type: String
      // required: true
   },
   linkedIn: {
      type: String
      // required: true
   },
   facebook: {
      type: String
   },
   phonenumber: {
      type: String,
      required: true
   },
   urlPath: {
      type: String,
      default: "avatar.png",
      required: true
   },
   address1: {
      type: String,
      required: true
   },
   address2: {
      type: String
      // required:true
   },
   address3: {
      type: String
      // required:true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   }
});

module.exports = mongoose.model("Bookstore", bookSchema);
