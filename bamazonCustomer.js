var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
var article = 0;
var quantity = 0;


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
Init();









// Funtions



function Init(){

  inquirer.prompt([
    {
      name: "id",
      message: "Which article would you like to buy ? (Use Id number)"
    },
    {
      name: "quantity",
      message: "How many of this article ?"
    }
  
  ]).then(function(answers) {
    article = answers.id;
    quantity = answers.quantity;
    confirmStock(article,quantity);
  });
  
  }


  function displayProducts(){
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement

      console.table("\n-------------------------------------------------------------------\n");   
      console.table(res);
      console.table("\n--------------------------------------------------------------------\n");   
     
    });
  }

  function confirmStock(id,quantity){

    var query = "select stock_quantity from products where item_id = " + mysql.escape(id);
    connection.query(query, function(err, results){

      if (err) throw err;
      console.log(results[0].stock_quantity);

      if (results[0].stock_quantity >= quantity ){
        var newVal = results[0].stock_quantity - quantity;
        console.log("We are placing your purcharse");
        processPurchase(article,newVal);
       

      }else {

        console.log("Sorry we don't have enough stock to process your purcharse");
      }


    })
  };

  function processPurchase(id,newVal){

    var query = "update products set stock_quantity = " + mysql.escape(newVal) +" where item_id = " + mysql.escape(id);
    connection.query(query, function(err, results){

      if (err) throw err;
      

    })
  }

