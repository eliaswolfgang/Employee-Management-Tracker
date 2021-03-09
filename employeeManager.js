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
    console.log(`Added ${role.title} to ${department_id.name}`);
}

async function newEmployee() {
    const roles = await query.viewRoles();
    const departments = await query.viewDepartments();
    const allEmployees = await query.viewEmployees();
    // Map the departments table to have options to select
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
    const newEmployee = await prompt([
        {
            name: 'first_name',
            message: "What is this employee's name?"
        },
        {
            name: 'last_name',
            message: "What is this employee's last name?"
        },
        {
            name: 'role_id',
            type: 'list',
            message: "What is this employee's role?",
            choices: roleOptions
        },
        {
            name: 'manager_id',
            type: 'list',
            message: "Which department should this employee be added to?",
            choices: departmentOptions
        }
    ]);
    // Add newEmployee to the database and return the updated employee table
    await query.addEmployee(newEmployee);
    console.log(`Added ${newEmployee.first_name} ${newEmployee.last_name} to ${manager_id.name}`, '\n');
    console.table(allEmployees);
    main();
}

async function changeEmployeeRole() {
    const employees = await query.viewEmployees();
    const roles = await query.findAllRoles();
    const roleOptions = roles.map(
        ({ id, title }) => 
        ({
            name: title,
            value: id
        }));
    const employeeOptions = employees.map(
        ({ id, first_name, last_name }) => 
        ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
    
      const { employeeId } = await prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeOptions
        }
      ]);
    
      const { roleId } = await prompt([
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to assign the selected employee?",
          choices: roleOptions
        }
      ]);
    
      await query.updateRole(employeeId, roleId);
      console.log("Updated employee's role");
      main();
}

async function quit() {
    console.log('Staff is up-to-date!');
    process.exit();
}
// Call our init function to run main prompts on load
init();


