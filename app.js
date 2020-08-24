const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeesTeam = [];

// Manager question variable:
const managerQuestions = [

    {
        type: "input",
        name: "name",
        message: "Please enter the your name:",
        
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager"]
    },
    {
        type: "input",
        name: "email",
        message:  "Please enter this managers e-mail:",
        
    },
    {
        type: "input",
        name: "officeNum",
        message: "Please enter their office number:",

    },
    {
        type:  "list",
        name: "hasTeam",
        message: "Do you have any team members?",
        choices: ["Yes", "No"]
    }
]

// Employee question variable:
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please enter the employers name:",

    },
    {
        type: "input",
        name: "email",
        message: "Please enter the employees email:",
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["Engineer", "Intern"]
    },
    {
        when: input => {
            return input.role == "Engineer"
        },
        type: "input",
        name: "github",
        message:  "Hello Engineer, please enter you github username:",
    },
    {
        when: input => {
            return input.role == "Intern"
        },
        type: "input",
        name: "school",
        message: "Hello Intern, please enter your school name:"
    },
    {
        type: "list",
        name: "addAnother",
        message:  "Add another team member?",
        choices: ["Yes", "No"]
    }
]


// Write code to use inquirer to gather information about the development team members,


// and to create objects for each team member (using the correct classes as blueprints!)
function assembleTeam () {
    // run inquire, prompt employeeQuestions; promise function if the role is defined as "engineer"
    inquirer.prompt(employeeQuestions).then(employeeInfo => {
        //if user selects engineer
        if (employeeInfo.role == "Engineer") {
            var addMember = new Engineer(employeeInfo.name, employeesTeam.length + 1, employeeInfo.email, employeeInfo.github, employeeInfo.role);
        } else {
        //if user selects intern
            var addMember = new Intern (employeeInfo.name, employeesTeam.length +1, employeeInfo.email, employeeInfo.school, employeeInfo.role);
        }
        //push new member to teamlist
        employeesTeam.push(addMember);
        //if manager would like to add another team member
        if (employeeInfo.addAnother === "Yes") {
           // console.log("");
           // run buildTeam function again
            assembleTeam();
        } else {
            // if user is finished run builHTMl
            buildTeam();
            console.log(employeesTeam)
        }

    })
}
function start() {
        inquirer.prompt(managerQuestions).then(managerInfo => {
            let manager = new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.officeNum, managerInfo.role);
            employeesTeam.push(manager);
        if (managerInfo.hasTeam === "Yes") {
            assembleTeam();
        } else{
            buildTeam();
            console.log(employeesTeam)
        }
    })
}

start();

function buildTeam() {
    fs.writeFile(outputPath, render(employeesTeam), function(err) {
        if(err){
            return console.log(err); 
        } 
    } );
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
