import Web3 from 'web3';
import Crud from '../build/contracts/Crud.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(
    Crud.abi, 
    Crud
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $update = document.getElementById('edit');
  const $updateResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete')
  const $deleteResult = document.getElementById('delete-result');

  let accounts = [];

  web3.eth.getAccounts().then((_accounts) => {
    accounts = _accounts
  })

  $create.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = e.target.elements[0].value;
    crud.methods
      .create(value)
      .send({from : accounts[0]})
      .then(() => $createResult.innerHTML = `Successfully created ${value}`)
      .catch((e) => {
        $createResult.innerHTML = `Failed to create, error : ${e}`
      })
  })

  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .read(id)
      .call()
      .then((res) => {
        $readResult.innerHTML = `Id : ${res[0]}, User : ${res[1]}`;
      })
      .catch(err => 
          $readResult.innerHTML = `Failed to read with error : ${err}`
        )
  })

  $update.addEventListener('submit', () => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    crud.methods 
      .update(id, name)
      .send({from : accounts[0]})
      .then(() => {
        $updateResult.innerHTML = `Updated the name of user to : ${name}`
      })
      .catch(err => $updateResult.innerHTML = `failed to error : ${err}`)
  })

  $delete.addEventListener('submit', () => {
    e.preventDefault()
    const id = e.target.elemets[0].value;
    crud.methods
      .destroy(id)
      .send({from : accounts[0]})
      .then(() => {
        $updateResult.innerHTML = `deleted the user with id : ${id}`;
      })
      .catch(err => {
        $updateResult.innerHTML = `failed to delete the user with error : ${err}`;
      })
  })  
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
