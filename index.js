const express = require("express");
const basePath = process.cwd();
const mysql = require("mysql");
const database = require('./database/index')
const app = express();
var path = require('path');
const { startCreating, buildSetup } = require(`./NFT-Creator/hashlip/src/main.js`);
const port = 8000;

//-----------------顯示圖片--------------
var dir = path.join(__dirname, 'public');
app.use(express.static(__dirname + '/public'));
//----------------------------------------
app.get("/", (req, res) => {
    res.send("Hello World !");
});

app.get("/makeNFT", (req, res) => {
    try{
        buildSetup();
        startCreating();
        res.send("NFT Create 成功!!!");
    }
    catch(error)
    {
        res.send(error);
    }
});

app.get("/getJson/:id.json", (req, res) => {
    
    var metadata = {
        name: `Your Collection #${req.params["id"]}123456`,
        description: "test NFT",
        image: `https://secret-oasis-58410.herokuapp.com/images/${req.params["id"]}.jpg`,
        test:"can be changed"
      }

    res.json(metadata);
});

app.get("/player/getAttributes/:id",async(req, res, next) => {

    let sql = `select * from nft_attributes where tokenID = ${req.params["id"]}`;
    try {
        results = await database.sqlConnection(sql);
        if(results.length > 0)
        {
            var respone = 
            {
                tokenID:results[0].tokenID,
                name:results[0].name,
                satiety:results[0].satiety,
                Favorability:results[0].Favorability
            }
            console.log(results);
            res.json(respone);
        }
        else
        {
            res.send("tokenID not exist");
        }
    } catch (error) {
        console.log(error);
        res.send("error");
    }
});



//heroku的版本
app.listen(process.env.PORT || port, () =>{
    console.log("Server has started!");
});


