let contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "hello",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ]

let contractAddress = '0xA5577E3B14B87b140e632CE64df717560C92491D'

let web3 = new Web3('http://127.0.0.1:9545')

let helloWorld = new web3.eth.Contract(contractABI, contractAddress)

document.addEventListener('DOMContentLoaded', () => {
helloWorld.methods.hello().call() 
.then(result => {
    document.getElementById('hello').innerHTML = result
})
})

