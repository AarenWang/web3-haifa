async function main() {
    require('dotenv').config();

    const { API_URL, PRIVATE_KEY, MY_WALLET, DEST_WALLET } = process.env;
    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
    const myAddress = MY_WALLET;
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce从0开始



    const ERC20TransferABI = [{
            constant: false,
            inputs: [{
                    name: "_to",
                    type: "address",
                },
                {
                    name: "_value",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [{
                name: "",
                type: "bool",
            }, ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [{
                name: "_owner",
                type: "address",
            }, ],
            name: "balanceOf",
            outputs: [{
                name: "balance",
                type: "uint256",
            }, ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
    ]

    const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
    const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS);



    daiToken.methods.balanceOf(myAddress).call(function(err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("The balance is: ", res)
    });
}

main();