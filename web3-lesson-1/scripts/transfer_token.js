async function main() {
    require('dotenv').config();

    const { API_URL, PRIVATE_KEY, MY_WALLET, DEST_WALLET, MFT_TOKEN_ADDRESS } = process.env;
    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
    const myAddress = MY_WALLET;
    console.log(`myAddress=${myAddress}`);
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce从0开始



    const fs = require('fs');
    const jsonFile = "artifacts/contracts/Token.sol/Token.json";
    const parsed = JSON.parse(fs.readFileSync(jsonFile));
    const abi = parsed.abi;

    const token_contract = new web3.eth.Contract(abi, MFT_TOKEN_ADDRESS);

    token_contract.methods.balanceOf(myAddress).call(function(err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("From Account  balance is: ", res)
    });

    token_contract.methods.balanceOf(DEST_WALLET).call(function(err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("To Account  balance is: ", res)
    });

    const option = {
        "from": MY_WALLET,

    };
    // token_contract.methods.transfer(DEST_WALLET, '50').call(option, function(err, transactionHash) {
    //     if (err) {
    //         console.log("An error occured", err);
    //         return
    //     }
    //     console.log("The Transaction Hash is: ", transactionHash)
    // });

    token_contract.methods.transfer(DEST_WALLET, '50').send(option)
        .on('transactionHash', function(hash) {
            console.log("transactionHash hash=", hash);

        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("confirmation confirmationNumber=", confirmationNumber, " receipt=", receipt);

            token_contract.methods.balanceOf(myAddress).call(function(err, res) {
                if (err) {
                    console.log("An error occured", err)
                    return
                }
                console.log("After Transfer From Account  balance is: ", res)
            });

            token_contract.methods.balanceOf(DEST_WALLET).call(function(err, res) {
                if (err) {
                    console.log("An error occured", err)
                    return
                }
                console.log("After Transfer To Account  balance is: ", res)
            });

        })
        .on('receipt', function(receipt) {
            // receipt example
            console.log("receipt:", receipt);

        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log("error: ", error, receipt);
        });


}

main();