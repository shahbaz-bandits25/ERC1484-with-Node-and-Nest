const { expect } = require("chai");

describe("ERC1484", function () {

let ERC1484;
let Owner;
let ERC1484Token;
let addr1;
let addr2;
let c0; 
let sig; 
let sig2; 

beforeEach(async function(){
    ERC1484 = await ethers.getContractFactory("Erc1484");
    [Owner , addr1 , addr2] = await ethers.getSigners();
    ERC1484Token =  await ERC1484.deploy();

});


    it("Should create the identity", async function ()
    {
          expect(await ERC1484Token.createIdentity(Owner.address , [addr1.address] ,[addr2.address])).to.emit(ERC1484Token , "IdentityCreated").withArgs(Owner.address,1,Owner.address,Owner.address,[addr1.address],[addr2.address],false);
          
    }
    
    ); 

    it("Should create the identity delegated", async function (){

        c0 = await ethers.utils.arrayify(ethers.utils.id("Hello How are you?"));
        sig = await Owner.signMessage(c0);
        sig2 = await ethers.utils.splitSignature(sig);
        expect(await ERC1484Token.createIdentityDelegated(Owner.address, Owner.address , [addr1.address] ,[addr2.address] , sig2.v , sig2.r , sig2.s , 1)).to.emit(ERC1484Token , "IdentityCreated").withArgs(Owner.address,1,Owner.address,Owner.address,[addr1.address],[addr2.address],true);


    });

    it("Should add the associated address", async function (){

        c0 = await ethers.utils.arrayify(ethers.utils.id("Hello How are you?"));
        sig = await Owner.signMessage(c0);
        sig2 = await ethers.utils.splitSignature(sig);
        expect(await ERC1484Token.addAssociatedAddress(Owner.address, Owner.address  , sig2.v , sig2.r , sig2.s , 1)).to.emit(ERC1484Token , "AssociatedAddressAdded").withArgs(Owner.address ,0, Owner.address , Owner.address);


    });




});