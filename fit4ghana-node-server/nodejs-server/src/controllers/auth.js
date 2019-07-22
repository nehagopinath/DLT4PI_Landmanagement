/*
"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const config     = require('../config');
const UserModel  = require('../models/user');
const _ = require('lodash');

const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            .catch((e) => {
                res.status(500);
                res.json({
                    success: false,
                    message: 'Server error has occured: ' + e
                });
            });
    };

const login = (req,res) => {

    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });


    UserModel.findOne({email: req.body.email}).exec()
        .then(user => {
            var responseUser = user.toObject();

            responseUser.role = responseUser.role[0];

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).json({
                error: 'Authentication error',
                message: 'Password incorrect'
            });

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({ id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, history: user.history }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            //res.status(200).json({token: token});
            res.status(200).json(responseUser);

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};

const register = asyncMiddleware(async (req, res) => {

    // check if there is already one user with the given e-mail in the database
    let userCheck = await UserModel.findOne({email: req.body.email});
    if(userCheck != null) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'There is already one user with the e-mail address ' + req.body.email
        });
    } else {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a email property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'firstName')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a firstName property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'lastName')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a lastName property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'role')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a role property'
        });

        const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

        if (user.role === 'patient') {
            if (!user.hasOwnProperty('doctorEmail')) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'The request body must contain a doctor_email property when the role is Patient'
                });
            }
            if (!user.hasOwnProperty('therapistEmail')) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'The request body must contain a therapistEmail property when the role is Patient'
                });
            }

            // check if there is one doctor with the given e-mail in the database
            let doctorCheck = await UserModel.findOne({email: req.body.doctorEmail, role: 'doctor'});

            if(doctorCheck == null) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'There is no doctor with the e-mail address ' + req.body.doctorEmail
                });
            }
            else {
                let updateSuccesfull = await UserModel.update({ email: req.body.doctorEmail }, { $addToSet: { patients: req.body.email } });
            }

            // check if there is one therapist with the given e-mail in the database
            let therapistCheck = await UserModel.findOne({email: req.body.therapistEmail, role: 'therapist'});

            if(therapistCheck == null) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'There is no therapist with the e-mail address ' + req.body.therapistEmail
                });
            }
            else {
                let updateSuccesfull = await UserModel.update({ email: req.body.therapistEmail }, { $addToSet: { patients: req.body.email } });
            }

        }

        if (!(user.role === 'patient' || user.role === 'doctor' || user.role === 'therapist')) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The user role bust be either "patient", "doctor" or "therapist"'
            });
        }

        UserModel.create(user)
            .then(user => {

                // if user is registered without errors
                // create a token
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }, config.JwtSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                // When authentication fully enabled
                //res.status(200).json({token: token});
                res.status(200).json(user);

            })
            .catch(error => {
                if (error.code == 11000) {
                    res.status(400).json({
                        error: 'User exists',
                        message: error.message
                    })
                }
                else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    })
                }
            });
    }
});


// get list of all patients of a doctor
const listDoctorsPatients = asyncMiddleware(async (req, res) => {
    UserModel.find({role: 'patient', doctorEmail: req.query.email}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.status(200).json(userMap);
    }).limit(10);
});

// get list of all therapists of a doctor
const listTherapistsPatients = asyncMiddleware(async (req, res) => {
    UserModel.find({role: 'patient', therapistEmail: req.query.email}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.status(200).json(userMap);
    }).limit(10);
});

const me = (req, res) => {
    UserModel.findOne({email: req.query.email}).exec()
        .then(user => {
            if (!user) return res.status(404).json({
                error: 'Not Found '+ req.query.email,
                message: `User not found`
            });

            var responseUser = user.toObject();

            delete responseUser._id;

            switch(responseUser.role[0]) {
                case "Patient":
                    delete responseUser.patients;
                    break;
                case "Doctor":
                    delete responseUser.doctor_email;
                    delete responseUser.therapist_email;
                    delete responseUser.exercise_sets;
                    break;
                case "Therapist":
                    delete responseUser.doctor_email;
                    delete responseUser.therapist_email;
                    delete responseUser.exercise_sets;
                    break;
                default:
                    console.log("Unknown user type!");
            }

            responseUser.role = responseUser.role[0];
            res.status(200).json(responseUser)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};

module.exports = {
    login,
    register,
    logout,
    me,
    listDoctorsPatients,
    listTherapistsPatients
};*/
