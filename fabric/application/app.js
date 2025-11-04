/*
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Cliente demo para el chaincode ERC-20 de Hyperledger Fabric
 * Educational implementation for UTN Blockchain Diplomatura 2025
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

// Configuración de la red
const channelName = 'mychannel';
const chaincodeName = 'erc20token';

async function main() {
    try {
        console.log('🚀 Starting Fabric ERC-20 Client Application');
        
        // Construir ruta al connection profile
        const ccpPath = path.resolve(__dirname, '..', '..', 'fabric-samples', 'test-network', 
            'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        
        if (!fs.existsSync(ccpPath)) {
            console.log('❌ Connection profile not found. Please ensure fabric-samples test-network is running.');
            console.log('Run: cd fabric-samples/test-network && ./network.sh up createChannel -ca -s couchdb');
            return;
        }
        
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(path.join(process.cwd(), 'wallet'));

        // Verificar si el usuario existe en el wallet
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('❌ An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the enrollAdmin.js and registerUser.js applications before retrying');
            return;
        }

        // Conectar a la gateway
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'appUser',
            discovery: { enabled: true, asLocalhost: true }
        });

        console.log('✅ Connected to Fabric gateway');

        // Obtener la red y contrato
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        
        console.log('📊 Token Operations Demo');
        console.log('========================');

        // 1. Obtener información del token
        try {
            const tokenInfo = await contract.evaluateTransaction('GetTokenInfo');
            console.log('🪙 Token Info:', JSON.parse(tokenInfo.toString()));
        } catch (error) {
            console.log('ℹ️ Token not initialized yet.');
        }

        // 2. Obtener balance
        try {
            const userIdentity = 'Org1MSP::x509::/C=US/ST=North Carolina/O=Hyperledger/OU=client/CN=appUser';
            const balance = await contract.evaluateTransaction('BalanceOf', userIdentity);
            console.log('💰 Balance:', balance.toString(), 'tokens');
        } catch (error) {
            console.log('❌ Error getting balance:', error.message);
        }

        gateway.disconnect();
        console.log('✅ Application completed successfully');

    } catch (error) {
        console.error('❌ Failed to run the application:', error);
        process.exit(1);
    }
}

main();