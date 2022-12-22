let contractABI = []

let contractAddress = '0xA5577E3B14B87b140e632CE64df717560C92491D'

const web3 = new Web3('http://127.0.0.1:9545');

const simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);

console.log(simpleSmartContract)

web3.eth.getAccounts().then(console.log);