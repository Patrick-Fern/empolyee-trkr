const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');



function firstQuestion () {
    inquirer.prompt ({
        type: 'list',
        name: 'firstQuestion',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', "exit"]
    }).then(function(answer){
        switch(answer.firstQuestion){
            case "View all departments":
               showDepts();
                break;
            case "View all roles":
                showRoles();
                break;
            case "View all employees":
                showEmployees();
                break;
            case "add a department":
                addDept();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "update an employee role":
                updateEmployee();
                break;
            case "exit":
                console.log('thank you');
                break;
        }
    });
};

function showDepts () {
    const sql = `SELECT * FROM department`;

    db.query(sql).spread(function (department) {
        console.table(department)   
    }).then(function(){
        firstQuestion();
    });
};

function showRoles () {
    const sql = `select roles.title, roles.id, department.name AS department, roles.salary
    from roles
    left join department
    on roles.department_id = department.id`;

    db.query(sql).spread(function (roles) {
       console.table(roles)
    }).then(function(){
        firstQuestion();
    });
};

function showEmployees () {
    const sql = `select employee.id, employee.first_name, employee.last_name, roles.title as Job_title, department.name as department_name, roles.salary as salary
    from employee
    left join roles
    on role_id = roles.id
    left join department
    on department_id = department.id`;

    db.query(sql).spread(function (employee) {
        console.table(employee)
     }).then(function(){
         firstQuestion();
     });
};

function addDept () {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the department name?'
    }).then(function(answer){
        const sql = `insert into department (name) VALUES (?)`;
        const param = answer.name;

        db.query(sql, param).spread(function (result){
            console.log(result);
        }).then(function(){
            firstQuestion();
        });
    });            
}

function addRole() {
    const sql = `SELECT * FROM department`;

    db.query(sql).spread(function (department) {
        console.table(department)

     inquirer.prompt([
         {
         type: 'number',
         name: 'department_id',
         message: 'What is the id of the department this role belongs to?'
         },
         {
            type: 'input',
            name: 'title',
            message: 'what is the job title'
         },
         {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for the role?'
         }
        ]).then(function(answer){
            const sql = `insert into roles (title, salary, department_id) VALUES (?,?,?)`;
            const params = [answer.title, answer.salary, answer.department_id];

            db.query(sql, params).spread(function (result){
                console.log(result);
            }).then(function(){
                firstQuestion();
            });
        }); 
    });
}; 

function addEmployee() {

    const sql1 = `select employee.id, employee.first_name, employee.last_name, roles.title as Job_title, department.name as department_name, roles.salary as salary
    from employee
    left join roles
    on role_id = roles.id
    left join department
    on department_id = department.id`;

    db.query(sql1).spread(function (employee) {
        console.table(employee)});

    const sql = `select roles.title, roles.id, department.name AS department, roles.salary
    from roles
    left join department
    on roles.department_id = department.id`;

    db.query(sql).spread(function (roles) {
       console.table(roles)

       inquirer.prompt([
        {
        type: 'number',
        name: 'role_id',
        message: 'What is the id of the role this employee will preform?'
        },
        {
           type: 'input',
           name: 'first_name',
           message: 'what is their first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'what is their last name'
         },
        {
           type: 'number',
           name: 'manager_id',
           message: 'What is the id of their manager?'
        }
    ]).then(function(answer){
        const sql = `insert into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

        db.query(sql, params).spread(function (result){
            console.log(result);
        }).then(function(){
            firstQuestion();
        });
        }); 
    });
};

function updateEmployee() {
    console.log('call ok');
    const sql1 = `select employee.id, employee.first_name, employee.last_name, roles.title as Job_title, department.name as department_name, roles.salary as salary
    from employee
    left join roles
    on role_id = roles.id
    left join department
    on department_id = department.id`;

    db.query(sql1).spread(function (employee) {
        console.table(employee)});

    const sql = `select roles.title, roles.id, department.name AS department, roles.salary
    from roles
    left join department
    on roles.department_id = department.id`;

    db.query(sql).spread(function (roles) {
       console.table(roles)

       inquirer.prompt([
        {
        type: 'number',
        name: 'id',
        message: 'What is the id of the employee changing roles?'
        },
        {
           type: 'number',
           name: 'role_id',
           message: 'what is the id of their new role?'
        }
    ]).then(function(answer){
        const sql = `UPDATE employee SET role_id = ?
                    WHERE id =?`;
        const params = [answer.role_id, answer.id];

        db.query(sql, params).spread(function (result){
            console.log(result);
        }).then(function(){
            firstQuestion();
        });
    });
});         
};




           


function exit() {
    console.log('Thank you');
    db.query('quit;');
}





firstQuestion();