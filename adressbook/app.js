const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const multer = require("multer");

const User = require("./models/user");
const MONGODB_URL =
   "mongodb+srv://divyansh:divyansh@college-byypw.mongodb.net/test?retryWrites=true&w=majority";
const app = express();

const store = new MongoDbStore({
   uri: MONGODB_URL,
   collection: "sessions"
});

const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "image");
   },
   filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + "-" + file.originalname);
      
      //FOR WINDOWS USE THIS
      //cb(null, new Date().toISOString().replace(/:/g,'-') + "-" + file.originalname);
   }
});

const fileFilter = (req, file, cb) => {
   if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
   ) {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({ extended: true }));

app.use(
   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.set("views", path.join(__dirname, "views"));
app.set("veiw engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "image")));

app.use(
   session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false,
      store: store
   })
);

const authRoutes = require("./routes/auth");

app.use((req, res, next) => {
   if (!req.session.user) {
      return next();
   }
   User.findById(req.session.user._id)
      .then(user => {
         req.user = user;
         next();
      })
      .catch(err => console.log(err));
});

app.use((req, res, next) => {
   res.locals.isAuthenticated = req.session.isLoggedIn;
   next();
});

app.use(authRoutes);

mongoose
   .connect(MONGODB_URL)
   .then(result => {
      app.listen(3000);
   })
   .catch(err => {
      console.log(err);
   });
