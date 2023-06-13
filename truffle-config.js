const HDWalletProvider = require('@truffle/hdwallet-provider');
// Moonbeam Development Node Private Key
const privateKeyDev =
   '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342';
// Moonbase Alpha Private Key --> Please change this to your own Private Key with funds
// NOTE: Do not store your private key in plaintext files
//       this is only for demostration purposes only
const privateKeyMoonbase =
   '1ce8b643d27e41c376451926ae1b54d5ec3c5ad6aa04ff15a4ab663d82145d90';

module.exports = {
   networks: {
      // Moonbeam Development Network
      dev: {
         provider: () => {
            if (!privateKeyDev.trim()) {
               throw new Error(
                  'Please enter a private key with funds, you can use the default one'
               );
            }
            return new HDWalletProvider(
               privateKeyDev,
               'http://localhost:9944/'
            );
         },
         network_id: 1281,
      },
      // Moonbase Alpha TestNet
      moonbase: {
         provider: () => {
            if (!privateKeyMoonbase.trim()) {
               throw new Error(
                  'Please enter a private key with funds to send transactions to TestNet'
               );
            }
            if (privateKeyDev == privateKeyMoonbase) {
               throw new Error(
                  'Please change the private key used for Moonbase to your own with funds'
               );
            }
            return new HDWalletProvider(
               privateKeyMoonbase,
               'https://rpc.api.moonbase.moonbeam.network'
            );
         },
         network_id: 1287,
      },
   },
   // Solidity 0.8.0 Compiler
   compilers: {
      solc: {
         version: '^0.8.0',
         settings: {
            evmVersion: 'london', //added this london setting because moonbeam not up to date with solidity 28 other than london
         }
      },
   },
   // Moonbeam Truffle Plugin & Truffle Plugin for Verifying Smart Contracts
   plugins: ['moonbeam-truffle-plugin', 'truffle-plugin-verify'],
};
