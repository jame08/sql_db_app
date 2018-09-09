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


Init();
function Init (){

    inquirer.prompt([
        {
          name: "question",
          message: "Select Operation:",
          choices: ["Sale Products","Low Inventory","Add Stock","Add new Product"],
          type: "list"
    
        }
    
    
      ]).then(function (answers) {
       if (answers.question === "Sale Products"){

        viewProductForSale();
       

       } else if( answers.question === "Low Inventory" ){

        lowInventory();
       
        
       }else if (answers.question === "Add Stock" ){

        inquirer.prompt([
            {
              name: "id",
              message: "Which article would you like to stock up ? (Use Id number)"
        
            },
            {
              name: "quantity",
              message: "How many of this article?"
            }
        
          ]).then(function (answers) {
            var id = answers.id;
            var quantity = answers.quantity;
            addStock(id,quantity);
          
        
          });


       } else if (answers.question === 'Add new Product' ){

        inquirer.prompt([
            {
              name: "name",
              message: "New article name?"
        
            },
            {
              name: "department",
              message: "Product department ?"
            },
            {
                name: "price",
                message: "Product Price ?"
              },

              {
                name: "stock",
                message: "Product quantity ?"
              },
        
          ]).then(function (answers) {
    
           addNewProduct(answers.name,answers.department,answers.price,answers.stock);
          
        
          });



       }
   
        
       
      });
}

// functions 

function repeat(){

    inquirer.prompt([
        {
          type: "confirm",
          name: "repeat",
          message: "Do you want to do any other action ?"
        }
    
      ]).then(function (answers) {
    
        if (answers.repeat === true) {
    
          Init();
    
        } else {
    
        console.log("\n**********************************************************************\n");
          console.log("\nModule being close.. \n")
          console.log("\n**********************************************************************\n");
          connection.end();
        }
    
      });
}


function viewProductForSale (){

        console.log("\n\nProducts For Sale\n");
      
      
        connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
      
          console.log("\n**********************************************************************\n");
          console.table(res);
          console.log("\n**********************************************************************\n");
          repeat();
       
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

        repeat();
    
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

        repeat();
    });

}

function addStock(id,quantity){

    var query = "UPDATE products set stock_quantity = stock_quantity +"+ mysql.escape(quantity) +" where item_id = " + mysql.escape(id);
    connection.query(query, function (err, results) {
  
    if (err) throw err;

        console.log("\n**********************************************************************\n");
        console.log("\nProduct Stock Updated ! \n\n");
        console.table("Affected Rows: "+results.affectedRows);
        console.log("\n**********************************************************************\n");
        repeat();
    
    });


}