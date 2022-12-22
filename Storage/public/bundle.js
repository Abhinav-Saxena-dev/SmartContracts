const contractABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const contractAddress = '0xA5577E3B14B87b140e632CE64df717560C92491D'

  const web3 = new Web3('http://127.0.0.1:9545');

  const simpleStorage = new web3.eth.Contract(contractABI, contractAddress)

  document.addEventListener('DOMContentLoaded', () => {
    
    console.log('====================================');
    console.log(web3);
    console.log('====================================');

    console.log('====================================');
    console.log(simpleStorage);
    console.log('====================================');

    const $setData = document.getElementById('setData')
    const $data = document.getElementById('data')
    
    let accounts = []

    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts
    })

    const getData = () => {
        simpleStorage.methods.get().call()
        .then(result => {
            $data.innerHTML = result
        })
    }

    getData();

    $setData.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = e.target.elements[0].value
        simpleStorage.methods.set(data).send({from : accounts[0]})
        .then(getData())
    })
  })