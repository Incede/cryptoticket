In the Dapp there will be three modules:

    ganache-cli
    Ethereum-Dapp and Server
    Client (React App)



The above 3 modules will run in individual docker containers.

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


Dockerfile.ganache - In this Dockerfile, we’ll write all the instructions to set up and run the ganache-cli inside the container. Ganache-cli’s default host is 127.0.0.1 but for docker instance it is 0.0.0.0

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

compile.js -> compile the .sol smart contract and save the compiled contract in the build folder as .json 

web3.js -> work as a bridge between the application and the ethereum network.

logic.js -> consists of all the logic to interact with the deployed cryptoticketsales contract on the network.

deploy.js -> It will take the compiled contract cryptoticketsales.json and deploy the contract to the network. Initial sale price for 1 crypto ticket is 1000 wei


# Server

## Directory Structure

server
- routes
  - contract-API.js
  - smart-contract-API.js
- index.js

contract-API.js -> To compile and deploy the contract we have created APIs instead of manually compiling and deploying it on the network.

index.js -> server for ethereum dapp. The server is listening at the port 4000 .


# Client (React Application)

A component is the building block of any react app. To create a component it requires Component module from reactthe library. The endpoint is set to http://localhost:4000 as the server is running at 4000 port.

To make any request to the server axios library is used


# docker-compose.yml

In docker-compose.yml we can define all the containers’ configuration and all can be run with a single command.