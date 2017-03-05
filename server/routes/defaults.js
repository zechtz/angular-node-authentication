const path = require('path');

module.exports = {
  default: (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
  },
  ping: (req, res) => {
    res.status(200).json({message: 'pong'});
  }
};
