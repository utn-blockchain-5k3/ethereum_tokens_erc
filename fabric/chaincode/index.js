/*
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Token ERC-20 Chaincode for Hyperledger Fabric
 * Educational implementation for UTN Blockchain Diplomatura 2025
 */

'use strict';

const TokenERC20Contract = require('./lib/tokenERC20');

module.exports.TokenERC20Contract = TokenERC20Contract;
module.exports.contracts = [TokenERC20Contract];