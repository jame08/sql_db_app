
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


Init();

function Init (){

    console.log("\n\n******************************************")
    console.log("\nWelcome to the Supervisor Module\n")

    inquirer.prompt([
        {
          name: "question",
          message: "Select Operation:",
          choices: ["View Product Sales","Add Department"],
          type: "list"
          
        }
       
    
      ]).then(function (answers) {


        if(answers.question === "View Product Sales"){
            viewProductSales();
        }else {

            addDepartment();
        }

      });

    }

function addDepartment(){

    console.log("\nFill this Information \n")

    inquirer.prompt([
        {
          name: "dept",
          message: "Whats the Department Name ?",
          validate: validateStr
    
        },
        {
          name: "overhead",
          message: "Department Over Head ?",
          validate:validateNumber
      
        }
    
      ]).then(function (answers) {

        var query = "Insert into departments (department_name,over_head_cost) values (" +mysql.escape(answers.dept) +','+mysql.escape(answers.overhead) +")";
        connection.query(query, function (err, results) {
      
        if (err) throw err;
    
            console.log("\n**********************************************************************\n");
            console.log("\n Departmnent Added !\n\n");
            console.log("Affected Rows: "+results.affectedRows);
            console.log("Inserted Id: "+results.insertId);
            console.log("\n**********************************************************************\n");
    
         repeat();
        });
     
       
    
      });

}
function viewProductSales(){

    var query = `select departments.department_id,departments.department_name, departments.over_head_cost, SUM(products.product_sales) as product_sales, (departments.over_head_cost - SUM(products.product_sales) ) as total_profits
    from departments
    join products
    on departments.department_name = products.department_name
    group by departments.department_id order by departments.department_id asc`;

    connection.query(query, function (err, results) {
  
    if (err) throw err;

        console.log("\n**********************************************************************\n");
        console.log("\nProduct Sales\n\n");
        console.table(results);
        console.log("\n**********************************************************************\n");

       repeat();
    
    });

  

}



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