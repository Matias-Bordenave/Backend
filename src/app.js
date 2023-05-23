

const express = require("express");
const app = express();

const productManager = require("./src/productManager");
const  fs = requiere("fs");

class productManager{
    constructor(){
        if(fs.existsSync("./src/productos.json")){
            this.products = JSON.parse(
                fs.readFileSync("./src/productos.json","utf-8")
            );
        }else{
            this.products=[];
        }
    }
}
module.exports = productManager;