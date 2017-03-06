var passport =  require('passport');

module.exports = {
  new: (req, res) => {
    res.status(200).json({status: 'success', user: req.user});
  },
  destroy: (req, res) => {
    req.logout();
    res.status(200).json({message: 'logged out'});
  },
  create: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.json(401).json({err: info});
      req.logIn(user, (err) => {
        if (err) res.status(500).json({err: 'could not log in user'});
        res.status(200).json({status: 'Login was successful'});
      });
    })(req, res, next);
  },
  status: (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false
      });
    }
    res.status(200).json({
      status: true
    });
  }
};
