async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY, MY_WALLET, DEST_WALLET, MFT_TOKEN_ADDRESS } = process.env;

    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
    console.log(MY_WALLET);

    web3.eth.sign("Hello world", MY_WALLET).then(console.log);

    //等价与上面Hello World直接签名
    web3.eth.sign(web3.utils.utf8ToHex("Hello world"), MY_WALLET).then(console.log);

    web3.eth.accounts.signTransaction({
        from: MY_WALLET,
        gasPrice: "20000000000",
        gas: "21000",
        to: DEST_WALLET,
        value: "1000000000000000000",
        data: ""
    }, PRIVATE_KEY).then(console.log);

}


main();