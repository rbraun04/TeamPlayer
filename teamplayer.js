const inquire = require("inquirer");
const fs = require('fs');
const Manager = require("./Manager");
const Intern = require("./Intern")
const Engineer = require("./Engineer")


//  Build variables containing each type of team member

// Team array:
var teamList = [];

// Manager question variable:
const managerQuestions = [

    {
        type: "input",
        name: "name",
        message: "Please enter the managers name:",
        
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

// Emolpyee question variable:
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "{lease enter the employers name:",

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
        choice: ["engineer", "intern"]
    },
    {
        when: input => {
            return input.role == "engineer"
        },
        type: "input",
        name: "gitthub",
        message:  "Hello Engineer, please enter you github username:",
    },
    {
        when: input => {
            return input.role == "intern"
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

// Build functions to build Webpage, TeamList, Employee Card, and userPrompt 

function buildTeam () {
    // run inquire, prompt employeeQuestions; promise function if the role is defined as "engineer"
    inquire.prompt(employeeQuestions).then(employeeInfo => {
        if (employeeInfo.role == "engineer") {
            var newMember = new Engineer(employeeInfo.name, teamList.length + 1, employeeInfo.email, employeeInfo.github);
        } else {
            var newMember = new Intern (employeeinfo.name, teamList.length +1, employeeInfo.email, employeeInfo.school);
        }
        teamList.push(newMember);
        if (employeeInfo.Info.addanother === "Yes") {
            console.log("");
            buildTeam();
        } else {
            buildHtmlPage();
        }

    })
}


