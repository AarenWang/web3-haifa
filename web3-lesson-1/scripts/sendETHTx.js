async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY, MY_WALLET, DEST_WALLET } = process.env;
    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
    const myAddress = MY_WALLET;
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce从0开始

    const transaction = {
        'from': MY_WALLET,
        'to': DEST_WALLET, // faucet address to return eth
        'value': web3.utils.toWei('1', 'ether'), //需要将货币单位转为WEI
        //'value': '1000000',
        'gas': 30000,
        //'maxFeePerGas': 1000000108,
        'gasLimit': 53000,
        'nonce': nonce,
        // optional data field to send message or execute smart contract
    };

    console.log(transaction);

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if (!error) {
            console.log("🎉 The hash of your transaction is: ", hash, "\n Check  Mempool to view the status of your transaction!");
        } else {
            console.log("❗Something went wrong while submitting your transaction:", error)
        }
    });
}

main();