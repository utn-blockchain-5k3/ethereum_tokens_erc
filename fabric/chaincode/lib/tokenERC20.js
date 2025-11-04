/*
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ERC-20 Token Contract for Hyperledger Fabric
 * Educational implementation based on fabric-samples patterns
 */

'use strict';

const { Contract } = require('fabric-contract-api');

// Define objectType names for prefix
const balancePrefix = 'balance';
const allowancePrefix = 'allowance';

// Define key names for options
const nameKey = 'name';
const symbolKey = 'symbol';
const decimalsKey = 'decimals';
const totalSupplyKey = 'totalSupply';

class TokenERC20Contract extends Contract {

    /**
     * Initialize token with name, symbol, decimals, and total supply
     * @param {Context} ctx - Transaction context
     * @param {string} name - Token name
     * @param {string} symbol - Token symbol
     * @param {string} decimals - Number of decimals
     * @param {string} totalSupply - Total supply of tokens
     */
    async Initialize(ctx, name, symbol, decimals, totalSupply) {
        console.log('Initializing ERC-20 Token');
        
        const clientId = ctx.clientIdentity.getID();
        const mspId = ctx.clientIdentity.getMSPID();
        
        console.log(`Client: ${clientId}, MSP: ${mspId}`);
        
        // Check if token is already initialized
        const nameExists = await ctx.stub.getState(nameKey);
        if (nameExists && nameExists.length > 0) {
            throw new Error('Token is already initialized');
        }
        
        // Validate inputs
        if (!name || !symbol || !decimals || !totalSupply) {
            throw new Error('All parameters (name, symbol, decimals, totalSupply) are required');
        }
        
        const decimalsInt = parseInt(decimals);
        const totalSupplyInt = parseInt(totalSupply);
        
        if (isNaN(decimalsInt) || decimalsInt < 0) {
            throw new Error('Decimals must be a non-negative integer');
        }
        
        if (isNaN(totalSupplyInt) || totalSupplyInt <= 0) {
            throw new Error('Total supply must be a positive integer');
        }
        
        // Store token metadata
        await ctx.stub.putState(nameKey, Buffer.from(name));
        await ctx.stub.putState(symbolKey, Buffer.from(symbol));
        await ctx.stub.putState(decimalsKey, Buffer.from(decimalsInt.toString()));
        await ctx.stub.putState(totalSupplyKey, Buffer.from(totalSupplyInt.toString()));
        
        // Assign total supply to deployer
        const balanceKey = ctx.stub.createCompositeKey(balancePrefix, [clientId]);
        await ctx.stub.putState(balanceKey, Buffer.from(totalSupplyInt.toString()));
        
        // Emit Transfer event from 0x0 to deployer
        const transferEvent = {
            from: '0x0',
            to: clientId,
            value: totalSupplyInt
        };
        
        ctx.stub.setEvent('Transfer', Buffer.from(JSON.stringify(transferEvent)));
        
        console.log(`Token ${name} (${symbol}) initialized with total supply ${totalSupplyInt}`);
        
        return JSON.stringify({
            success: true,
            message: `Token ${name} initialized successfully`,
            totalSupply: totalSupplyInt,
            owner: clientId
        });
    }

    /**
     * Transfer tokens from sender to recipient
     * @param {Context} ctx - Transaction context
     * @param {string} to - Recipient address
     * @param {string} value - Amount to transfer
     */
    async Transfer(ctx, to, value) {
        const from = ctx.clientIdentity.getID();
        
        if (!to || !value) {
            throw new Error('Recipient and value are required');
        }
        
        const transferValue = parseInt(value);
        if (isNaN(transferValue) || transferValue <= 0) {
            throw new Error('Transfer value must be a positive integer');
        }
        
        if (from === to) {
            throw new Error('Cannot transfer to self');
        }
        
        // Get current balances
        const fromBalance = await this._getBalance(ctx, from);
        const toBalance = await this._getBalance(ctx, to);
        
        if (fromBalance < transferValue) {
            throw new Error(`Insufficient balance. Current balance: ${fromBalance}, requested: ${transferValue}`);
        }
        
        // Update balances
        const fromBalanceKey = ctx.stub.createCompositeKey(balancePrefix, [from]);
        const toBalanceKey = ctx.stub.createCompositeKey(balancePrefix, [to]);
        
        await ctx.stub.putState(fromBalanceKey, Buffer.from((fromBalance - transferValue).toString()));
        await ctx.stub.putState(toBalanceKey, Buffer.from((toBalance + transferValue).toString()));
        
        // Emit Transfer event
        const transferEvent = {
            from: from,
            to: to,
            value: transferValue
        };
        
        ctx.stub.setEvent('Transfer', Buffer.from(JSON.stringify(transferEvent)));
        
        console.log(`Transferred ${transferValue} tokens from ${from} to ${to}`);
        
        return JSON.stringify({
            success: true,
            message: `Successfully transferred ${transferValue} tokens`,
            from: from,
            to: to,
            value: transferValue
        });
    }

    /**
     * Get balance of an account
     * @param {Context} ctx - Transaction context
     * @param {string} account - Account to query
     */
    async BalanceOf(ctx, account) {
        if (!account) {
            throw new Error('Account parameter is required');
        }
        
        const balance = await this._getBalance(ctx, account);
        return balance.toString();
    }

    /**
     * Approve another account to spend tokens on behalf of the caller
     * @param {Context} ctx - Transaction context
     * @param {string} spender - Account to approve
     * @param {string} value - Amount to approve
     */
    async Approve(ctx, spender, value) {
        const owner = ctx.clientIdentity.getID();
        
        if (!spender || !value) {
            throw new Error('Spender and value are required');
        }
        
        const approveValue = parseInt(value);
        if (isNaN(approveValue) || approveValue < 0) {
            throw new Error('Approval value must be a non-negative integer');
        }
        
        if (owner === spender) {
            throw new Error('Cannot approve self');
        }
        
        // Set allowance
        const allowanceKey = ctx.stub.createCompositeKey(allowancePrefix, [owner, spender]);
        await ctx.stub.putState(allowanceKey, Buffer.from(approveValue.toString()));
        
        // Emit Approval event
        const approvalEvent = {
            owner: owner,
            spender: spender,
            value: approveValue
        };
        
        ctx.stub.setEvent('Approval', Buffer.from(JSON.stringify(approvalEvent)));
        
        return JSON.stringify({
            success: true,
            message: `Approved ${approveValue} tokens for ${spender}`,
            owner: owner,
            spender: spender,
            value: approveValue
        });
    }

    /**
     * Get the allowance of a spender for an owner
     * @param {Context} ctx - Transaction context
     * @param {string} owner - Token owner
     * @param {string} spender - Account to check allowance for
     */
    async Allowance(ctx, owner, spender) {
        if (!owner || !spender) {
            throw new Error('Owner and spender parameters are required');
        }
        
        const allowanceKey = ctx.stub.createCompositeKey(allowancePrefix, [owner, spender]);
        const allowanceBytes = await ctx.stub.getState(allowanceKey);
        
        if (!allowanceBytes || allowanceBytes.length === 0) {
            return '0';
        }
        
        return allowanceBytes.toString();
    }

    /**
     * Internal function to get balance
     * @param {Context} ctx - Transaction context
     * @param {string} account - Account to get balance for
     */
    async _getBalance(ctx, account) {
        const balanceKey = ctx.stub.createCompositeKey(balancePrefix, [account]);
        const balanceBytes = await ctx.stub.getState(balanceKey);
        
        if (!balanceBytes || balanceBytes.length === 0) {
            return 0;
        }
        
        return parseInt(balanceBytes.toString());
    }

    /**
     * Get token name
     * @param {Context} ctx - Transaction context
     */
    async Name(ctx) {
        const nameBytes = await ctx.stub.getState(nameKey);
        if (!nameBytes || nameBytes.length === 0) {
            throw new Error('Token not initialized');
        }
        return nameBytes.toString();
    }

    /**
     * Get token symbol
     * @param {Context} ctx - Transaction context
     */
    async Symbol(ctx) {
        const symbolBytes = await ctx.stub.getState(symbolKey);
        if (!symbolBytes || symbolBytes.length === 0) {
            throw new Error('Token not initialized');
        }
        return symbolBytes.toString();
    }

    /**
     * Get number of decimals
     * @param {Context} ctx - Transaction context
     */
    async Decimals(ctx) {
        const decimalsBytes = await ctx.stub.getState(decimalsKey);
        if (!decimalsBytes || decimalsBytes.length === 0) {
            throw new Error('Token not initialized');
        }
        return decimalsBytes.toString();
    }

    /**
     * Get total supply
     * @param {Context} ctx - Transaction context
     */
    async TotalSupply(ctx) {
        const totalSupplyBytes = await ctx.stub.getState(totalSupplyKey);
        if (!totalSupplyBytes || totalSupplyBytes.length === 0) {
            throw new Error('Token not initialized');
        }
        return totalSupplyBytes.toString();
    }

    /**
     * Get token information
     * @param {Context} ctx - Transaction context
     */
    async GetTokenInfo(ctx) {
        const name = await this.Name(ctx);
        const symbol = await this.Symbol(ctx);
        const decimals = await this.Decimals(ctx);
        const totalSupply = await this.TotalSupply(ctx);
        
        return JSON.stringify({
            name: name,
            symbol: symbol,
            decimals: parseInt(decimals),
            totalSupply: parseInt(totalSupply)
        });
    }

    /**
     * Get all balances (for testing purposes only)
     * @param {Context} ctx - Transaction context
     */
    async GetAllBalances(ctx) {
        const iterator = await ctx.stub.getStateByPartialCompositeKey(balancePrefix, []);
        const balances = {};
        
        while (true) {
            const result = await iterator.next();
            
            if (result.value && result.value.value.toString()) {
                const key = result.value.key;
                const splitKey = ctx.stub.splitCompositeKey(key);
                const account = splitKey.attributes[0];
                const balance = parseInt(result.value.value.toString());
                balances[account] = balance;
            }
            
            if (result.done) {
                await iterator.close();
                break;
            }
        }
        
        return JSON.stringify(balances);
    }
}

module.exports = TokenERC20Contract;