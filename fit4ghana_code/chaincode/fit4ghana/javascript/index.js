/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Land = require('./lib/land');
const Buysellrequest = require('./lib/buysellrequest');
const Registrationrequest = require('./lib/registrationrequest');

module.exports.Land = Land;
module.exports.Buysellrequest = Buysellrequest;
module.exports.Registrationrequest = Registrationrequest;
module.exports.contracts = [ Land, Buysellrequest, Registrationrequest];
