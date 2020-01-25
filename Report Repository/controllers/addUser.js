const Bookstore = require("../models/userBook");

exports.getAddUser = (req, res, next) => {
   res.render("addUser.ejs", {
      path: "/addUser"
   });
};

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
