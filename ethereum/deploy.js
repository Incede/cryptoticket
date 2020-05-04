const fs = require("fs-extra");
const path = require("path");
const {web3, web3Network} = require("./web3");
const compiledContract_sales = require("./build/sales.json");
const compiledContract_ticket = require("./build/ticket.json");
const circularJSON = require('circular-json');
const price = 1000;  // Initial sale price for 1 crypto ticket is 1000 wei

const deploy = async (price) => {
    try {
        // set the receipt path 
        const receiptPath = path.resolve("ethereum","receipt-"+web3Network+".json");
        console.log(`---------- receipt path -------- ${receiptPath}`);
        
        // deploying the contract with accounts[0]
        const accounts = await web3.eth.getAccounts();
        console.log(`Attempting to deploy from account , ${accounts[0]}`);

        /**
         * To deploy a new it requires contract interface and its bytecode
         * Both we get after compiling the smart contract 
         * The compiled smart contract is saved in build folder in json 
         */
        const result_ticket = await new web3.eth.Contract(
            JSON.parse(compiledContract_ticket.interface)
        )
        .deploy({data: compiledContract_ticket.bytecode})
        .send({gas: 3000000, from: accounts[0]});
        console.log(`Ticket Contract deployed to ${result_ticket.options.address}`);


        const result_sales = await new web3.eth.Contract(
            JSON.parse(compiledContract_sales.interface)
        )
        .deploy({data: compiledContract_sales.bytecode, arguments: [price,result_ticket.options.address]})
        .send({gas: 3000000, from: accounts[1]});
        console.log(`Sales Contract deployed to ${result_sales.options.address}`);

        // CircularJson is converting nested object into string which can be then saved as json
        const serialised_sales = circularJSON.stringify(result_sales.options);

        // save the receipt address in receipt path
        fs.writeJsonSync(receiptPath,result_sales.options);
        
        console.log("receipt saved successfully");
        return await serialised_sales;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// deploy("ticket & sales");
module.exports = deploy;