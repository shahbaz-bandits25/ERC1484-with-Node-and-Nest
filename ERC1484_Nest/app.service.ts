import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
const artifacts = require('../../artifacts/contracts/ERC1484.sol/Erc1484.json');


const abi = artifacts["abi"];

const Address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let provider = new ethers.providers.JsonRpcProvider();
// let accounts = await provider.listAccounts();
let instance = new ethers.Contract(Address, abi, provider.getSigner());


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello This is from ERC 1484 NEST JS!';
  }

 async getIdentityByEIN(ein :number)
  {
    try {
      let resp = await instance.getIdentity(ein);
      console.log(resp);
      
      return resp;
    }
    catch(error) {
      return error.body;
    }
  }

  async createIdentity(recoveryAddress: string, providers: string[], resolvers: string[] ) 
  {
    let accounts = await provider.listAccounts();
    try{
      let resp = await instance.connect(provider.getSigner()).createIdentity( accounts[0],[accounts[0]],[accounts[0]]);
      let receipt = await resp.wait();
    //return "Identity Has been created!!";
    }
    catch(error) {
      return error;
    }


  }


}
