const Web3 = require('web3');
const artifacts = require("../artifacts/contracts/ERC1484.sol/Erc1484.json");
let deployedHardhatAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
instance = new web3.eth.Contract(artifacts["abi"], deployedHardhatAddress);

// const as = async()=>{
//    try{ 
// var accounts = await web3.eth.getAccounts();}
// catch(err){
//     console.log(err)
// }
// }



const express = require('express');
const app = express();
app.use(express.json());

// app.post();
// app.put();
// app.delete();


app.get('/' , async(req , res) =>
{
    res.json("Hello");
    await instance.methods.getIdentity(req.body.ein).call().
    then((result) =>{
        console.log(result);
        res.send(result);
    } ).catch(err =>{
        console.log(err)
    })
} );

app.post('/api/' , async(req , res) =>
{
    try{
    let accounts = await web3.eth.getAccounts();
    let re = await instance.methods.createIdentity(accounts[0],[accounts[0]],[accounts[0]]).send({'from':accounts[0]});
    let rV = await re.events.IdentityCreated.returnValues;
    res.json(rV.recoveryAddress);
}
    catch(err){
        console.log(err);
    }
} );


//For Add Providers
app.post('/api/AddProviders' , async(req , res) =>
{
    try{
    let accounts = await web3.eth.getAccounts();
    let re = await instance.methods.addProviders([accounts[0]]).send({'from':accounts[0]});
    let rV = await re.events.ProviderAdded.returnValues;
    res.json(rV);

    }
    catch(err)
    {
        console.log(err);
    }
});

//For Identity Delegated
app.post('/api/identityDelegated' , async(req , res) =>
{
    try{
        
       
        let accounts = await web3.eth.getAccounts();
        let msg = "Hello How are you?";
        //let messageHash= web3.eth.accounts.hashMessage("Hello How are you?");
        let messageHash= web3.utils.keccak256(msg);
        console.log("MSG HASH==>"+messageHash);
        let Sig =  web3.eth.accounts.sign(messageHash, "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
        //let Sig = web3.eth.sign(accounts[0], web3.utils.sha3());
        let re = await instance.methods.createIdentityDelegated(accounts[0] ,accounts[0],[accounts[0]],[accounts[0]], Sig.v , Sig.r , Sig.s , 1).send({'from':accounts[0]});
        console.log(Sig);
        console.log(re);
        let rV = await re.events.IdentityCreated.returnValues;
       // console.log(rV);
        res.json(rV);


    }
    
    catch(err){
        console.log(err);
    }
} );

// app.get('/api/courses/:id' , (req , res) =>
// {
//     let course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course)
//     {
//         res.status(404).send("Not Found!!");
//     }
//     else
//     {
//         res.send(course);
//     }
// } );


// //POST

// app.post('/api/courses' , (req , res) =>
// {
//     try{

    
//     let course ={
//         id:courses.length+1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// }
// catch(error)
// {
//     console.log(error);
// }
// } );


app.listen(3000, () => console.log("Listening on port 3000"));