const connection = require('./connection.js');

class DB {
    // Reference the connection to build it into what each method will return
    constructor(connection) {
        this.connection = connection;
    }
    // View all departments
    viewDepartments() {
        return this.connection.query(
           "SELECT * FROM department ORDER BY id"
        );
    }
    // View all roles
    viewRoles() {
        return this.connection.query(
            "SELECT title, salary, department_id FROM role ORDER BY id"
        );
    }
    // View all employees with name, role, and manager ID
    viewEmployees() {
        return this.connection.query(
            "SELECT CONCAT(e.first_name, ' ', e.last_name) AS name, r.title AS role, e.manager_id FROM employee e LEFT JOIN role r ON e.role_id = r.id"
        );
    }
    // Add a department
    addDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department
        );
    }
    // Add a new role
    addRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        );
    }
    // Add a new employee
    addEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        );
    }
    // Update a given employee's role
    updateRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }
}

module.exports = new DB(connection);