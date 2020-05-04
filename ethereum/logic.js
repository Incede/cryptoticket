const fs = require("fs-extra");
const {web3} = require("./web3");
//const compileContract_ticket = require("./build/ticket.json");
const compileContract = require("./build/sales.json");

// Contract object deployed on network (ganache-cli or testnet or mainnet)
// network can be selected in web3 file

// contract object
const getContractObject = () => {
    
    const contractReceipt = require("./receipt-ganache.json");
    // create a contract object/instance 
    const contractObject = new web3.eth.Contract(
        JSON.parse(compileContract.interface),
        contractReceipt.address
    );

    return contractObject;
};

const buyTicket = async (_tokenId) => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods
                    .purchaseToken(_tokenId)
                    .send({from : accounts[2], gas:1000000});
    console.info(receipt);
    console.info("Purchase Order of ticket successfully submitted!");
    return receipt;
};

const sellTicket = async (_tokenId, sale_price) => {
    const contractObject = getContractObject();
    const accounts = await web3.eth.getAccounts();
    const result = await contractObject.methods
                   .sellToken(_tokenId, sale_price)
                   .call({from:accounts[2]});
    console.log(result);
    return result;
};


module.exports = {
    buyTicket,
    sellTicket
};