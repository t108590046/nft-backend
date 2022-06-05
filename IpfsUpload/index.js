const ipfsClient = require("ipfs-api");
const ipfs = new ipfsClient({host:'ipfs.infura.io',port:5001,protocol:'https'});
const fs = require("fs");

 const  UploadToIpfs = async(tokenId) => {
    addpath = `./public/images/${tokenId}.png`;
    buffile = fs.readFileSync(addpath);
    let URL = "";
     await ipfs.add(buffile).then((fileinfo)=>{
        console.log(fileinfo);
        URL =  fileinfo[0].hash;
      });
    return URL ;
}

module.exports = {UploadToIpfs}