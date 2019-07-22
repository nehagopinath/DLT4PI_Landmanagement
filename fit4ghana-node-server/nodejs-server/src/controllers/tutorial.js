/*
"use strict";

const TutorialModel = require('../models/tutorial');

const getTutorialById = (req, res) => {
    let id = req.params.id;

    TutorialModel.findById(id)
    .exec()
    .then(tutorials =>
        res.status(200).json(tutorials)
    )
    .catch(error =>
        res.status(500).json({
            error: 'Internal server error',
            message:'Error retrieving Tutorial with id '+ id + ' from database'
        })
    );
};

const createTutorial = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'description')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a description property'
    });

    const tutorial = Object.assign(req.body);

    TutorialModel.create(tutorial)
        .then(tutorial => {
            res.status(200).json({response: "Tutorial added to database", id: tutorial._id});
        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'Tutorial exists',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });
};

module.exports = {
    getTutorialById,
    createTutorial
};*/
