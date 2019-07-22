"use strict";

const { FileSystemWallet, Gateway } = require('fabric-client');

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

const create = asyncMiddleware(async (req, res) => {

    let id = req.params.id;
    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: 'familyMember', discovery: {enabled: false}});
});


module.exports = {
    create
};
