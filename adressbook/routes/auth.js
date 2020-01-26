const express = require("express");

const authController = require("../controllers/auth");
const getUserBook = require("../controllers/getUser");
const addUserController = require("../controllers/addUser");

const Bookstore = require("../models/userBook");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

//router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.get("/getUser", getUserBook.getUser);

router.post("/delete", getUserBook.deleteUser);

router.get("/addUser", addUserController.getAddUser);

router.post("/addUser", (req, res, next) => {
   console.log(req.body);
   console.log(req.user);
   const email = req.body.email;
   const name = req.body.name;
   const phone = req.body.phone;
   const adress = req.body.addrs;
   //    const adress2 = req.body.adress2;
   const bookstore = new Bookstore({
      name: name,
      email: email,
      phonenumber: phone,
      address1: adress,
      userId: req.user._id
      //   address2: adress2
   });
   bookstore
      .save()
      .then(result => {
         console.log("user added");
         res.redirect("/getUser");
      })
      .catch(err => {
         console.log(err);
      });
   //(req, res) => {
   //    addUserController.postAddUser;
});

module.exports = router;
