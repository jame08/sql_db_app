var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

const receipt = [];





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







function viewProductForSale (){

        console.log("Products For Sale\n");
      
      
        connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
      
          console.log("\n**********************************************************************\n");
          console.table(res);
          console.log("\n**********************************************************************\n");
       
        });
      }


function lowInventory(){

    var query = "SELECT * FROM products where stock_quantity < 5";
    connection.query(query, function (err, results) {
  
    if (err) throw err;

        console.log("\n**********************************************************************\n");
        console.log("\nLow Inventory Products\n\n");
        console.table(results);
        console.log("\n**********************************************************************\n");

    
    });

}


function addNewProduct(product_name,department,price,stock){

    var query = "Insert into products (product_name,department_name,price,stock_quantity) values (" + mysql.escape(product_name) +',' +mysql.escape(department) +','+mysql.escape(price) +','+ mysql.escape(stock) +")";
    connection.query(query, function (err, results) {
  
    if (err) throw err;

        console.log("\n**********************************************************************\n");
        console.log("\n Product Added !\n\n");
        console.log("Affected Rows: "+results.affectedRows);
        console.log("Inserted Id: "+results.insertId);
        console.log("\n**********************************************************************\n");

    
    });

}

function addStock(id,quantity){

    var query = "UPDATE products set stock_quantity = "+ mysql.escape(quantity) +" where item_id = " + mysql.escape(id);
    connection.query(query, function (err, results) {
  
    if (err) throw err;

        console.log("\n**********************************************************************\n");
        console.log("\nProduct Stuck Updated ! \n\n");
        console.table(results);
        console.log("\n**********************************************************************\n");

    
    });


}