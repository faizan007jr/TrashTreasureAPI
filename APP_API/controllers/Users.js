const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Addresses = mongoose.model('Addresses');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    Users
        .find()
        .populate('address')
        .sort([['firstName', 'ascending']])
        .exec((err, usersData) => {
            if(err) {
                res
                    .status(404)
                    .json(err)
                return;
            }
            res
                .status(200)
                .json(usersData);
        });
};

const createUser = (req, res) => {
    let address = new Addresses({
        line1: req.body.address.line1,
        line2: req.body.address.line2,
        street: req.body.address.street,
        city:  req.body.address.city,
        state: req.body.address.state,
        country:  req.body.address.country,
        postalCode: req.body.address.postalCode
    });

    Users
        .findOne({ $or : [ { username: req.body.username }, { email: req.body.email } ] })
        .exec((err, usersData) => {
           if(usersData) {
               res
                   .status(409)
                   .json({ "message": "Duplicate Value" });
               return;
           } else {
               bcrypt.hash(req.body.pwd, 10, (err, hash) => {
                  if(err) {
                      res
                          .status(500)
                          .json({ "message": "Unable to hash password"})
                      return
                  } else {

                      address.save((err, addressData) => {
                          if (err) {
                              res
                                  .status(400)
                                  .json(err);
                              return;
                          }
                          Users
                              .create({
                                  firstName: req.body.firstName,
                                  lastName: req.body.lastName,
                                  username: req.body.username,
                                  pwd: hash,
                                  email: req.body.email,
                                  dob: req.body.dob,
                                  address: addressData._id,
                                  profileImage: req.body.profileImage
                              }, (err, userData) => {
                                  if (err) {
                                      res
                                          .status(400)
                                          .json(err);
                                      return;
                                  }
                                  const token = jwt.sign(
                                      {
                                          username: userData.username,
                                          userId: userData._id
                                      },
                                      "somesecret",
                                      {
                                          expiresIn: "1h"
                                      }
                                  );
                                  res
                                      .status(201)
                                      .json({
                                          "message" : "Login Successful",
                                          "token": token
                                      });
                              });

                      });
                  }
               });
           }
        });
};

const getSingleUser = (req, res) => {
    Users
        .findById(req.params.userid)
        .populate('address')
        .exec((err, user) => {
            if(!user) {
                res
                    .status(404)
                    .json({ "message": "User not found" });
                return;
            } else if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(user);
        });
};

const updatePassword = (req, res) => {
    if(!req.userCookie.username) {
        res
            .status(404)
            .json({ "message" : "Not found, User must login" });
        return;
    }
    Users
        .findOne({ username: req.userCookie.username })
        .exec((err, userData) => {
            if(!userData) {
                res
                    .status(404)
                    .json({ "message" : "User Not found" });
                return;
            } else if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            // TODO: valid password
            if(userData.pwd != req.body.pwd) {
                res
                    .status(403)
                    .json({ "message": "Password incorrect" });
                return;
            }

            userData.pwd = req.body.newpwd;
            userData.save((err, userData) => {
                if(err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(userData);
            });
        });
};

const updateProfileImage = (req, res) => {
    if(!req.userCookie.username) {
        res
            .status(404)
            .json({ "message" : "Not found, User is not logged in" });
        return;
    }
    Users
        .findOne({ username: req.userCookie.username })
        .exec((err, userData) => {
            if(!userData) {
                res
                    .status(404)
                    .json({ "message" : "User Not found" });
                return;
            } else if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            userData.profileImage = req.body.profileImage;

            userData.save((err, userData) => {
                if(err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(userData);
            });
        });
};

const updateAddress = (req, res) => {
    if(!req.userCookie.username) {
        res
            .status(404)
            .json({ "message" : "Not found, User must be logged in" });
        return;
    }
    Users
        .findOne({ username: req.userCookie.username })
        .exec((err, userData) => {
            if(!userData) {
                res
                    .status(404)
                    .json({ "message" : "User Not found" });
                return;
            } else if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            Addresses
                .findById(userData.address)
                .exec((err, addressData) => {
                    if(err) {
                        res
                            .status(404)
                            .json(err);
                        return;
                    }
                    addressData.line1 = req.body.line1;
                    addressData.line2 = req.body.line2;
                    addressData.street = req.body.street;
                    addressData.city =  req.body.city;
                    addressData.state = req.body.state;
                    addressData.country =  req.body.country;
                    addressData.postalCode = req.body.postalCode;
                    addressData.save((err, updatedAddress) => {
                        if(err) {
                            res
                                .status(400)
                                .json(err);
                            return;
                        }
                        res
                            .status(200)
                            .json(updatedAddress);
                    });
                });
        });
};

const login = (req, res) => {
    Users
        .findOne({
            username: req.body.username
        })
        .exec((err, userData) => {
            if(!userData) {
                res
                    .status(401)
                    .json({ "message" : "Invalid username or password" });
                return;
            } else if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            bcrypt.compare(req.body.pwd, userData.pwd, (err, result) => {
                if(err) {
                    res
                        .status(401)
                        .json({ "message" : "Invalid username or password" });
                    return;
                }
                if(result) {
                    const token = jwt.sign(
                        {
                            username: userData.username,
                            userId: userData._id
                        },
                        "somesecret",
                        {
                            expiresIn: "1h"
                        }
                    );

                    res
                        .status(200)
                        .json({
                            "message" : "Login Successful",
                            "token": token
                        });
                    return;;
                }
                res
                    .status(401)
                    .json({ "message" : "Invalid username or password" });
            });
        });
};

/*const logout = (req, res) => {
    if (req.userCookie.username && req.cookies.user_sid) {
        req.session.destroy();
        res
            .status(401)
            .json({ "message" : "User Logged out" });
    } else {
        res
            .status(404)
            .json({ "message" : "Invalid user" });
    }
};*/

module.exports = {
    getUsers,
    createUser,
    getSingleUser,
    updatePassword,
    updateProfileImage,
    updateAddress,
    login
};