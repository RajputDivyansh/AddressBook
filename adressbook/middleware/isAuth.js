exports.isAuth = (req, res, next) => {
   if (!req.session.isLoggedIn) {
      return res.redirect("/login");
   }
   next();
};

// caching disabled for every route
exports.cacheControll = (req, res, next) => {
   res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
   );
   next();
};
