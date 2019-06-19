const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

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
    console.log("test 1")
    return res.status(422).send({ error: 'You must provide email, name and password' })
  }

  if (password != passwordReEntry) {
    console.log("test 2")
    return res.status(422).send({ error: 'Password does not match' })
  }

  console.log("CLEARED TESTS")

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

exports.getUserById = function (req, res, next) {
  var id = req.body.id;
  console.log("ID: " + id)
  User.findById(id, function (err, user) {
    if (err) { return next(err) }

    user.password = ""
    console.log("getUserById Found User")
    console.log(user)
    res.json({ user: user })
  })
} 