const express = require("express");

const authController = require("../controllers/auth");
const getUserBook = require("../controllers/getUser");
const addUserController = require("../controllers/addUser");

const Bookstore = require("../models/userBook");

const authentication = require("../middleware/isAuth");

const router = express.Router();

router.get("/login", authController.getLogin);

//router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/logout", authentication.cacheControll, authController.postLogout);

router.get("/getUser", authentication.isAuth, getUserBook.getUser);

router.post("/delete", authentication.isAuth, getUserBook.deleteUser);

router.get("/addUser", authentication.isAuth, addUserController.getAddUser);

router.post("/addUser", authentication.isAuth, (req, res, next) => {
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

router.get(
   "/editUser/:bookId",
   authentication.isAuth,
   addUserController.getEditUser
);

router.post("/editUser", authentication.isAuth, (req, res, next) => {
   const updatedemail = req.body.email;
   const updatedname = req.body.name;
   const updatedphone = req.body.phone;
   const updatedadress = req.body.addrs;
   const userId = req.body.userId;

   Bookstore.findById(userId)
      .then(user => {
         if (user.userId.toString() !== req.user._id.toString()) {
            res.redirect("/getUser");
         }
         user.name = updatedname;
         user.email = updatedemail;
         user.phonenumber = updatedphone;
         user.address1 = updatedadress;
         return user.save().then(result => {
            console.log("user updated");
            res.redirect("/getUser");
         });
      })
      .catch(err => {
         console.log(err);
      });
});
// addUserController.postEditUser);

module.exports = router;
