// const crypto = require("crypto");

const bcrypt = require("bcryptjs");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
   res.render("login.ejs", {
      path: "/login"
   });
};

exports.postLogin = (req, res, next) => {
   console.log(req.body);
   const email = req.body.email;
   const password = req.body.passwd;
   User.findOne({ email: email })
      .then(user => {
         if (!user) {
            return res.redirect("/login");
         }
         bcrypt
            .compare(password, user.password)
            .then(doMatch => {
               if (doMatch) {
                  //   req.session.isLoggedIn = true;
                  req.session.user = user;
                  req.session.save(err => {
                     console.log(err);
                  });
                  return res.redirect("/getUser");
               }
               res.redirect("/login");
            })
            .catch(err => {
               console.log(err);
               res.redirect("/login");
            });
      })
      .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
   console.log(req.body);
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.psw;
   const phone = req.body.phone;
   User.findOne({ email: email })
      .then(userDoc => {
         if (userDoc) {
            alert("Email already exists");
            res.redirect("/login");
         }
         return bcrypt
            .hash(password, 12)
            .then(hashedpassword => {
               const user = new User({
                  name: name,
                  email: email,
                  password: hashedpassword,
                  phonenumber: phone
               });
               return user.save();
            })
            .then(result => {
               res.redirect("/login");
               /*return transporter.sendMail({
                to: email,
                from: 'report@repository.com'
                subject: 'Confirmation and Signup Sucessful'
            })*/
            })
            .catch(err => {
               console.log(err);
            });
      })
      .catch(err => {
         console.log(err);
      });
};
