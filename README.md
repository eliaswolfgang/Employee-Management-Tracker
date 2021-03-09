# Employee Management Tracker
A CLI built for managing an employee database

## Description
This simple CLI is set up to access a MySQL database named 'employees,' and allows users to view all departments, roles, and employees within that database. From the CLI, a user can also add departments, roles, and employees; and update a current employee's role.

## Installation
From the 'db' file, open the schema.sql in MySQL Workbench and execute the script. Then, open the seed.sql in MySQL Workbench and execute the script. This will establish a seed database to work with. Then, simply run
```
npm i
npm start
```
from the command line in the root directory. Happy employee management!

## Future Development
This application is nowhere near finished! For future development, additional MySQL scripts need to be added to allow users to perform the following actions from the command line:  

* Update employee managers
* View employees by manager
* Delete departments, roles, and employees; and
* View the total utilized budget of a department