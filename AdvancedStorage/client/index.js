import Web3 from 'web3';

import AdvancedStorage from '../build/contracts/AdvancedStorage.json';

let web3;
let advancedStorage;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {

        //Case 1 : when new metamask is present
        if(typeof window.ethereum !== 'undefined'){
            window.ethereum.enable()
            .then(() => {
                resolve(
                    new Web3(window.ethereum)
                )
            })
            .catch(e => reject(e))
            return;
        }

        //Case 2 : When old metamask is present
        if(typeof window.web3 !== 'undefined'){
            return resolve(
                new Web3(window.web3.currentProvider
                    ))
        }

        //Case 3 : No metamask present, connect to ganache.
        return resolve(
            new Web3('http://localhost:9545')
        );
    })
}

const initContract = () => {
    const contractABI = AdvancedStorage.abi
    const deploymentKey = Object.keys(AdvancedStorage.networks)[0]
    return new web3.eth.Contract(
        contractABI,
        AdvancedStorage
            .networks[deploymentKey]
            .address
    );
}

const initApp = () => {
    const $addData = document.getElementById('addData');
    const $data = document.getElementById('data');
    let accounts = [];

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
            return advancedStorage.methods
                .getAll()
                .call()
        })
        .then(result => {
            $data.innerHTML = result.join(', ')
        })

    $addData.addEventListener('submit', e => {
        e.preventDefault();
        const value = e.target.elements[0].value
        advancedStorage.methods
            .add(value)
            .send({from : accounts[0]})
            .then(() => {
                return advancedStorage.methods
                .getAll()
                .call()
            })
            .then(result => {
                $data.innerHTML = result.join(', ')
            })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initWeb3().then(_web3 => {
        web3 = _web3
        advancedStorage = initContract();
        initApp();
    })
    .catch(e => console.log(e))
})