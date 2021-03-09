const { prompt } = require('inquirer');
const query = require('./db');
require('console.table');

function init() {
    console.log('Welcome to your employee management database!\n');
    // Run main prompts
    main();
}

async function main() {
    const { option } = await prompt([
        {
            name: 'option',
            type: 'list',
            message: "What would you like to do?",
            choices: [
              {
                  name: 'View All Departments',
                  value: 'view_departments'
              },
              {
                  name: 'View All Roles',
                  value: 'view_roles'
              },
              {
                  name: 'View All Employees',
                  value: 'view_employees'
              },
              {
                  name: 'Add Department',
                  value: 'add_department'
              },
              {
                  name: 'Add Role',
                  value: 'add_role'
              },
              {
                  name: 'Add Employee',
                  value: 'add_employee'
              },
              {
                  name: "Update Current Employee's Role",
                  value: 'update_employee'
              },
              {
                  name: 'Quit',
                  value: 'exit'
              }
            ]  
        }
    ]);
    // Switch cases for each choice
    switch (option) {
        case 'view_departments': 
            return allDepartments();
            break;
        case 'view_roles': 
            return allRoles();
            break;
        case 'view_employees': 
            return allEmployees();
            break;
        case 'add_department': 
            return newDepartment();
            break;
        case 'add_role': 
            return newRole();
            break;
        case 'add_employee': 
            return newEmployee();
            break;
        case 'update_employee': 
            return changeEmployeeRole();
            break;
        case 'exit': 
            return quit();
            break;
        default: 
            return quit()
    }
}

async function allDepartments() {
    const departments = await query.viewDepartments();
    console.log('Viewing all departments:\n');
    console.table(departments);
    main();
}

async function allRoles() {
    const roles = await query.viewRoles();
    console.log('Viewing all roles:\n');
    console.table(roles);
    main();
}

async function allEmployees() {
    const employees = await query.viewEmployees();
    console.log('Viewing all employees:\n');
    console.table(employees);
    main();
}

async function newDepartment() {
    const department = await prompt([
        {
            name: 'name',
            message: 'What is the name of this department?'
        }    
    ]);
    await query.addDepartment(department);
    console.log(`Added ${department.name}!`);
    main();
}

async function newRole() {
    const departments = await query.viewDepartments();
    // Map the departments table to have options to select
    const departmentOptions = departments.map(
        ({ id, name }) => 
        ({
            name: name,
            value: id
        }));
    // Build a new role object to pass to the addRole method 
    const role = await prompt([
        {
            name: 'title',
            message: 'What is the name of this new role?'
        },
        {
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Which department would you like to add this role to?',
            choices: departmentOptions
        }
    ]);
    
    // Add the new role object to the database
    await query.addRole(role);
    console.log(`Added ${role.title}`);
    main();
}

async function newEmployee() {
    const roles = await query.viewRoles();
    const departments = await query.viewDepartments();
    // Map the departments and roles tables to have options to select
    const departmentOptions = departments.map(
        ({ id, name }) => 
        ({
            name: name,
            value: id
        }));
    const roleOptions = roles.map(
        ({ id, title }) => 
        ({
            name: title,
            value: id
        }));
    const employee = await prompt([
        {
            name: 'first_name',
            message: "What is this employee's first name?"
        },
        {
            name: 'last_name',
            message: "What is this employee's last name?"
        },
    ]);
    const { roleID } = await prompt([
        {
            name: 'roleID',
            type: 'list',
            message: "What is this employee's role?",
            choices: roleOptions
        }
    ]);
    employee.role_id = roleID;

    const { managerID } = await prompt([
        {
            name: 'managerID',
            type: 'list',
            message: "Which department should this employee be added to?",
            choices: departmentOptions
        }
    ]);
    employee.manager_id = managerID;   
   
    // Add newEmployee to the database and return the updated employee table
    await query.addEmployee(employee);
    console.log(`Added ${employee.first_name} ${employee.last_name}`, '\n');

    main();
}

async function changeEmployeeRole() {
    const employees = await query.viewEmployees();
    const roles = await query.viewRoles();
    const roleOptions = roles.map(
        ({ id, title }) => 
        ({
            name: title,
            value: id
        }));
    const employeeOptions = employees.map(
        ({ id, name }) => 
        ({
            name: name,
            value: id
        }));
    
      const { employeeID } = await prompt([
        {
          type: "list",
          name: "employeeID",
          message: "Which employee's role do you want to update?",
          choices: employeeOptions
        }
      ]);
    
      const { roleID } = await prompt([
        {
          type: "list",
          name: "roleID",
          message: "Which role do you want to assign the selected employee?",
          choices: roleOptions
        }
      ]);
    
      await query.updateRole(employeeID, roleID);
      console.log("Updated employee's role");
      main();
}

async function quit() {
    console.log('Staff is up-to-date!');
    process.exit();
}
// Call our init function to run main prompts on load
init();


