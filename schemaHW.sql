create database bamazon;

use bamazon;
create table products(

item_id int not null auto_increment,
product_name varchar(150) not null,
department_name varchar(150) not null,
price int (30) not null, 
stock_quantity int(30) not null,
primary key (item_id)

);

create table  departments(

department_id int not null auto_increment,
department_name varchar(150) not null,
over_head_cost int (30) not null, 

primary key (department_id)

);

insert into products (product_name, department_name,price,stock_quantity)
values ('Sandals','Clothing',8,40);
insert into products (product_name, department_name,price,stock_quantity)
values ('Short Pants','Clothing',14,40);
insert into products (product_name, department_name,price,stock_quantity)
values ('Black Denin','Clothing',34,57);
insert into products (product_name, department_name,price,stock_quantity)
values ('Blue Denin','Clothing',38,89);
insert into products (product_name, department_name,price,stock_quantity)
values ('White T-Shirt','Clothing',10,59);
insert into products (product_name, department_name,price,stock_quantity)
values ('Black T-Shirt','Clothing',10,39);

insert into products (product_name, department_name,price,stock_quantity)
values ('Spoon','Kitchen',5,40);
insert into products (product_name, department_name,price,stock_quantity)
values ('Fork','Kitchen',5,60);



insert into products (product_name, department_name,price,stock_quantity)
values ('Aspirin 100 caps','Pharmacy',10,23);
insert into products (product_name, department_name,price,stock_quantity)
values ('Tylenol 50 caps','Pharmacy',8,33);
insert into products (product_name, department_name,price,stock_quantity)
values ('Drysol 100ml','Pharmacy',15,16);
insert into products (product_name, department_name,price,stock_quantity)
values ('Advil 75 caps','Pharmacy',7,31);

insert into products (product_name, department_name,price,stock_quantity)
values ('Spoon','Kitchen',5.56,40);
insert into products (product_name, department_name,price,stock_quantity)
values ('Fork','Kitchen',5,60);
insert into products (product_name, department_name,price,stock_quantity)
values ('Knife','Kitchen',4,53);
insert into products (product_name, department_name,price,stock_quantity)
values ('Frying Pan','Kitchen',17,32);
insert into products (product_name, department_name,price,stock_quantity)
values ('Crockpot','Kitchen',45,13);
insert into products (product_name, department_name,price,stock_quantity)
values ('Blender','Kitchen',12,23);



insert into products (product_name, department_name,price,stock_quantity)
values ('Sugar','Food',5,40);
insert into products (product_name, department_name,price,stock_quantity)
values ('Pepper','Food',6,35);
insert into products (product_name, department_name,price,stock_quantity)
values ('Salt','Food',3,80);
insert into products (product_name, department_name,price,stock_quantity)
values ('Cumin','Food',8,56);
insert into products (product_name, department_name,price,stock_quantity)
values ('Basil','Food',7,50);
insert into products (product_name, department_name,price,stock_quantity)
values ('Ginger','Food',2,40);
insert into products (product_name, department_name,price,stock_quantity)
values ('Sage','Food',2,100);
insert into products (product_name, department_name,price,stock_quantity)
values ('Oregano','Food',2,92);
insert into products (product_name, department_name,price,stock_quantity)
values ('Sunflower','Food',1,58);



use bamazon;
select departments.department_id ,departments.department_name, departments.over_head_cost, 
SUM(products.product_sales) as product_sales, (departments.over_head_cost - SUM(products.product_sales) ) as total_profits
from departments
join products
 on  departments.department_name = products.department_name
 group  by departments.department_id order by departments.department_id asc;