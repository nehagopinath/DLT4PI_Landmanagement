/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Land = require('./land');
const Buysellrequest = require('./buysellrequest');
const Registrationrequest = require('./registrationrequest');

module.exports.Land = Land;

module.exports.Buysellrequest = Buysellrequest;

module.exports.Registrationrequest = Registrationrequest;
module.exports.contracts = [ Land, Buysellrequest,Registrationrequest];
