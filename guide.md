In Dapp there are three modules:
```
    ganache-cli
    Ethereum-Dapp and Server
    Client (React App)
```


These modules run in individual docker containers.

# Project Setup

# Directory Structure

docker-ethereum
- client
- ethereum
- server
- .dockerignore
- docker-compose.yml
- Dockerfile
- Dockerfile.ganache
- package.json


`Dockerfile.ganache` has instructions to setup and run ganache-cli inside Docker container. Ganache-cli’s default host is `127.0.0.1` but for docker instance it is `0.0.0.0`

# Ethereum Dapp

## Directory Structure

Ethereum
- build
- contracts
  - Message.sol
- compile.js
- deploy.js
- logic.js
- receipt-ganache.json
- web3.js

`compile.js` -> compile the .sol smart contract and save the compiled contract in the build folder as .json 

`web3.js` -> work as a bridge between the application and the ethereum network.

`logic.js` -> consists of all the logic to interact with the deployed cryptoticketsales contract on the network.

`deploy.js` -> Takes compiled contract `cryptoticketsales.json` and deploys it to the network. Initial sale price for 1 crypto ticket is 1000 wei


# Server

## Directory Structure

Server
- routes
  - contract-API.js
  - smart-contract-API.js
- index.js

`contract-API.js` -> To compile and deploy the contract we have created APIs instead of manually compiling and deploying it on the network.

`index.js` -> server for ethereum dapp. The server is listening at the port 4000 .


# Client (React Application)

A component is the building block of any react app. The endpoint is set to `http://localhost:4000` as the server is running at `4000` port. To make any request to server `axios` library is used


## docker-compose.yml

In `docker-compose.yml` are written configurations for all containers which can be run with a single command.