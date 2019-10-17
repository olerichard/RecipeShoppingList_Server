const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
const JwtDecode = require('jwt-decode');

function tokenForUser(user) {
  const time = new Date().getTime()
  return jwt.encode({ sub: user._id, iat: time }, config.secret)

}

exports.login = function (req, res, next) {
  res.send({ token: tokenForUser(req.user), user: req.user });
};

exports.createUser = function (req, res, next) {
  console.log("Create User Start");
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const passwordReEntry = req.body.passwordreentry;

  console.log(req.body)

  if (!email || !password || !name) {
    return res.status(422).send({ error: 'You must provide email, name and password' })
  }

  if (password != passwordReEntry) {
    return res.status(422).send({ error: 'Password does not match' })
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({
      email: email,
      name: name,
      password: password
    });

    user.save(function (err) {
      if (err) { return next(err) }

      res.json({ token: tokenForUser(user), user: user });
    });

  });
}

exports.getUserById = async function (req, res, next) {
  const token = req.headers.authorization.split(' ');
  const decodedToken = JwtDecode(token[1]);
  const user = await User.findById(decodedToken.sub);
  
  if(user === null || user === undefined){
    res.json({error:"User info not found"})
    return
  }

  console.log("ID: " + user._id)
  res.json({ user: user })
} 