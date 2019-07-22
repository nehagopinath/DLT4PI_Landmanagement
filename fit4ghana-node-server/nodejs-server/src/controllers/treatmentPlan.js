/*
"use strict";

const TreatmentPlanModel = require('../models/treatmentPlan');

const addSetToPlan  = (req, res) => {

    return res.status(400).json({
        error: 'Bad Request',
        message: 'Not implemented yet'
    });
    
//does not work
/!*
    if (!Object.prototype.hasOwnProperty.call(req.body, 'patientEmail')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a patientEmail property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'exerciseSets')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a exerciseSets array'
    });

    var treatmentPlan = Object.assign(req.body);

    var exerciseSetIds = [];
    for (var i = 0, len = treatmentPlan.exerciseSets.length; i < len; i++) { 
        exerciseSetIds.push(
            mongoose.Types.ObjectId(treatmentPlan.exerciseSets[i]));
    }

    TreatmentPlanModel
    .where({ patientEmail: treatmentPlan.patientEmail })
    .update({ $set: { exerciseSets: exerciseSetIds }})
    .exec()
    .then(plan =>
        res.status(200).json(plan)
    )
    .catch(error =>
        res.status(500).json({
            error: 'Internal server error',
            message: 'DB Error updating plan'
        })
    );*!/
};

// const getTreatmentPlanById = (req, res) => {
//     let email = req.params.id;

//     TreatmentPlanModel.findOne({patientEmail: email})
//     .exec()
//     .then(plan =>
//         res.status(200).json(plan)
//     )
//     .catch(error =>
//         res.status(500).json({
//             error: 'Internal server error',
//             message: 'Error retrieving TreatmentPlan with email '+ email + ' from database'
//         })
//     );
// };

const getTreatmentPlanById = (req, res) => {
    let id = req.params.id;

    TreatmentPlanModel.findById(id)
    .exec()
    .then(treatment =>
        res.status(200).json(treatment)
    )
    .catch(error =>
        res.status(500).json({
            error: 'Internal server error',
            message: 'Error retrieving TreatmentPlan with id '+ id + ' from database'
        })
    );
};

const createTreatmentPlan = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'patientEmail')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a patientEmail property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'exerciseSets')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a exerciseSets array'
    });

    var treatmentPlan = Object.assign(req.body);

    TreatmentPlanModel.create(treatmentPlan)
        .then(treatmentPlan => {
            res.status(200).json(treatmentPlan);
        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'TreatmentPlan exists',
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

const updateMilestonesOfTreatmentPlan = (req,res) => {

    // db.inventory.update(
    //     { _id: 2 },
    //     { $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
    // )

    var treatmentPlan = Object.assign(req.body);
    console.log(req.body);

    TreatmentPlanModel.update(
        { _id: treatmentPlan.id },
        { $addToSet: { milestones: { $each: [ treatmentPlan.milestones ] } } }
    )
        .then(updatedTreatmentPlan => {
            res.status(200).json(updatedTreatmentPlan);
        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'TreatmentPlan exists',
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
    getTreatmentPlanById,
    createTreatmentPlan,
    addSetToPlan,
    updateMilestonesOfTreatmentPlan
};*/
