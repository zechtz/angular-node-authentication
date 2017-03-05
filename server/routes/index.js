var express  =  require('express');
var router   =  express.Router();
var session  =  require('./session');
var users    =  require('./user');
var defaults =  require('./defaults');

router.get('/login',       session.new);
router.post('/login',      session.create);
router.get('/user/status', session.status);
router.get('/logout',      session.destroy);

router.get('/users/new',  users.new);
router.post('/register', users.create);

router.get('/ping', defaults.ping);
router.get('*', defaults.default);

module.exports = router;
