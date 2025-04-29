require('dotenv').config();

module.exports = {
  validUsername: process.env.USERNAME ,
  validPassword: process.env.PASSWORD ,
  lockedOutUsername: process.env.LOCKED_OUT_USERNAME ,
  visualUsername: process.env.VISUAL_USERNAME ,
};
