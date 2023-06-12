const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.register = (req, res, next) => {
  const {       firstName,
    lastName,
    address,
    password,
    confirmPassword,
    email,
    mobile,
    schoolName } = req.body;
  // Validation
  if (!email || !password) throw new Error("must have email & password");

  if (password.length < 6 || password.length > 10)
    throw new Error("Password must be 4-10 characters");

  if (password != confirmPassword)
    throw new Error("Password and Confirm Password not match");



  bcrypt
    .hash(password, 10)
    .then((hashed) => {
      return User.create({
        email: email,
        password: hashed,
        firstName,
    lastName,
    address,
    confirmPassword,
    mobile,
    schoolName
      });
    }).then( rs => {
      const payload = {
        id: rs.id,
        email: rs.email
    }
    const token = jwt.sign(payload, `${process.env.JWT_SECRETKEY}`, {expiresIn: '30d'})
    res.json({token : token})
    })

};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email: email },
  }).then((user) => {
      if (!user) 
        throw new Error("Cannot Login 1");
      return Promise.all([ bcrypt.compare(password, user.password), Promise.resolve(user)]) //เทียบ bcrypt
    }).then( ([pwOk, user]) => {
        if(!pwOk)
          throw new Error("Cannot Login 2")
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = jwt.sign(payload, `${process.env.JWT_SECRETKEY}`, {expiresIn: '30d'})
        res.json({token : token})
    }).catch(next)
};


exports.getMe = (req, res, next) => {
  const {id, email} = req.user
  res.json({id, email})
}