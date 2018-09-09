
require("dotenv").config();
var credentials = require("./credentials");
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

const {validateNumber, validateStr} = require('./validate');



const receipt = [];


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: credentials.db.user,

  // Your password
  password: credentials.db.password,
  database: "bamazon"
});


displayProducts();

// Funtions



function Init() {



  inquirer.prompt([
    {
      name: "id",
      message: "Which article would you like to buy ? (Use Id number)",
      validate: validateNumber


    },
    {
      name: "quantity",
      message: "How many of this article ?",
      validate: validateNumber
     
    
    }

  ]).then(function (answers) {
    var id = answers.id;
    var quantity = answers.quantity;
    productExist(id, quantity);

  });


}





function displayProducts() {
  console.log("Products Availables ...\n");


  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement

    console.log("\n**********************************************************************\n");
    console.table(res);
    console.log("\n**********************************************************************\n");
    Init();
  });
}


function productExist(id, quantity) {

  var query = "SELECT COUNT(*) as total FROM products";
  var artCount = 0;
  connection.query(query, function (err, results) {

  if (err) throw err;

   artCount = results[0].total;

   if (id > artCount) {

    console.log("Sorry this product does not exist. Please select a product from the product list\n");
    Init();

  } else {
    confirmPurcharse(id, quantity);

  }
  
  });
}




function confirmPurcharse(id, quantity) {

  var query = "select stock_quantity, price, product_name from products where item_id = " + mysql.escape(id);


  //query that retrieve the items from stock
  connection.query(query, function (err, results) {

    if (err) throw err;


    if (results[0].stock_quantity >= quantity) {
      var newVal = results[0].stock_quantity - quantity;
      console.log("\n**********************************************************************\n");
      console.log("We are placing your purcharse \n");

      processPurchase(id, newVal);
      console.log("This is your receipt: \n");
      customerReceipt(id, quantity, results[0].price, results[0].product_name);
      saleProduct(id,quantity,results[0].price);


    } else {

      console.log("Sorry we don't have enough stock to process your purcharse");
    }


  })


};

function saleProduct(id,quantity,price){

  var sale = quantity * price;

  var query = "update products set product_sales= " + mysql.escape(sale) + " where item_id = " + mysql.escape(id);
  connection.query(query, function (err, results) {

    if (err) throw err;

  })


}

function processPurchase(id, newVal) {

  var query = "update products set stock_quantity = " + mysql.escape(newVal) + " where item_id = " + mysql.escape(id);
  connection.query(query, function (err, results) {

    if (err) throw err;

  })
}

function customerReceipt(id, quantity, price, name) {

  var subtotal = quantity * price;

  obj = { Product_ID: id, Name: name, Quantity: quantity, Price: price, SubTotal: subtotal }
  receipt.push(obj);

  var total = receipt.reduce((total, obj) =>  total + obj.SubTotal, 0);


  console.table(receipt);
  console.log("\nYou pay: " + total + "  | with taxes: " + total * .18);

  inquirer.prompt([
    {
      type: "confirm",
      name: "newbuy",
      message: "Do you want to buy another product ?"
    }

  ]).then(function (answers) {

    if (answers.newbuy === true) {

      Init();

    } else {

      console.log("\nThanks For Shopping with us! \n")
      connection.end();
    }

  });

}