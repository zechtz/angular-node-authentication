var passport =  require('passport');
var User     =  require('../models/account');

module.exports = {
  new: (req, res)  => {
    res.status(200).json({message: 'success'});
  },

  create: (req, res) => {
    User.register(new User({ username: req.body.username }),
      req.body.password, (err, account) => {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, () => {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
  }
};
