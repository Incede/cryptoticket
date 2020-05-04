const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const compile = () => {
    try {
    // build path where compiled contract will save
    const buildPath = path.resolve(__dirname,"./build");

    // remove the build folder if it exist
    fs.removeSync(buildPath);

    // path of the Smart Contract
    const contractPath1 = path.resolve(__dirname,"./contracts","sales.sol");
    const contractPath2 = path.resolve(__dirname,"./contracts","ticket.sol");
    
    // Read the Smart Contract
    const source1 = fs.readFileSync(contractPath1, "utf8");
    const source2 = fs.readFileSync(contractPath2, "utf8");

    // Compile the smart contract
    const output1 = solc.compile(source1, 1).contracts[":sales"];
    const output2 = solc.compile(source2, 1).contracts[":ticket"];

    
    // Create the build folder if it not exist 
    fs.ensureDirSync(buildPath);
    
    // Save the output in json format
    fs.outputJSONSync(path.resolve(buildPath, "sales"+".json"), output1);
    fs.outputJSONSync(path.resolve(buildPath, "ticket"+".json"), output2);

    return "Contract compiled successfully!"
    } catch (error) {
        console.error(error);
        return error;
    }
};

// console.log(compile());

module.exports = compile;