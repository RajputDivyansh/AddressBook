const Bookstore = require("../models/userBook");

exports.getAddUser = (req, res, next) => {
   res.render("addUser.ejs", {
      path: "/addUser",
      editing: false
   });
};

exports.getEditUser = (req, res, next) => {
   const editMode = req.query.edit;
   if (!editMode) {
      return res.redirect("/getUser");
   }
   const bookId = req.params.bookId;
   Bookstore.findById(bookId)
      .then(user => {
         if (!user) {
            return res.redirect("/getUser");
         }
         res.render("addUser.ejs", {
            path: "/editUser",
            editing: editMode,
            user: user
         });
      })
      .catch(err => {
         console.log(err);
      });
};

// exports.postEditProduct = (req, res, next) => {
//    const updatedemail = req.body.email;
//    const updatedname = req.body.name;
//    const updatedphone = req.body.phone;
//    const updatedadress = req.body.addrs;
//    const updateduserId = req.body.userId;

//    userBook
//       .findById(userId)
//       .then(user => {
//          if (user.userId.toString() !== req.user._id.toString()) {
//             res.redirect("/getUser");
//          }
//          user.name = updatedname;
//          user.email = updatedemail;
//          user.phonenumber = updatedphone;
//          user.address1 = updatedadress;
//          return user.save().then(result => {
//             console.log("user updated");
//             res.redirect("/getUser");
//          });
//       })
//       .catch(err => {
//          console.log(err);
//       });
// };

// exports.postAdduser = (req, res, next) => {
//    console.log(req.body);
//    const email = req.body.email;
//    const name = req.body.name;
//    const phone = req.body.phone;
//    const adress = req.body.addrs;
//    //    const adress2 = req.body.adress2;
//    const bookstore = new Bookstore({
//       name: name,
//       email: email,
//       phonenumber: phone,
//       address1: adress
//       //userId: req.user
//       //   address2: adress2
//    });
//    bookstore
//       .save()
//       .then(result => {
//          console.log("user added");
//          res.redirect("/addUser");
//       })
//       .catch(err => {
//          console.log(err);
//       });
// };
