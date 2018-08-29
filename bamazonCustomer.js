var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
var receipt = [];
var artCount= 0;


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "jonas",
  database: "bamazon"
});


displayProducts();

// Funtions



function Init() {

  

  inquirer.prompt([
    {
      name: "id",
      message: "Which article would you like to buy ? (Use Id number)"
    },
    {
      name: "quantity",
      message: "How many of this article ?"
    }

  ]).then(function (answers) {
    var article = answers.id;
    var quantity = answers.quantity;
    verifyStock(article,quantity);

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


function verifyStock(article,quantity){

  var query1 = "SELECT COUNT(*) as total FROM products"; 


  connection.query(query1, function (err, results) {
    
        if (err) throw err;
      
       artCount = results[0].total;
        
      
      });

      console.log("artcount : " + artCount)
      if(quantity > artCount){

        console.log("Sorry this product does not exist. Please select a product from the product list\n");
        Init();
      
      }else
      {
        confirmPurcharse(article,quantity);
      
      }

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


    } else {

      console.log("Sorry we don't have enough stock to process your purcharse");
    }


  })


};

function processPurchase(id, newVal) {

  var query = "update products set stock_quantity = " + mysql.escape(newVal) + " where item_id = " + mysql.escape(id);
  connection.query(query, function (err, results) {

    if (err) throw err;
    
  })
}

function customerReceipt(id, quantity, price,name) {
  
  var subtotal = quantity * price;
  
  
  obj = { Product_ID: id, Name: name, Quantity: quantity, Price: price, Total: subtotal }
  receipt.push(obj);
 


  


  console.table(receipt);
  console.log("You pay: \n" );

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

      console.log("Thanks For Shopping with us! ")
    }

  });

}