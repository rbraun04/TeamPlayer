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

function buildTeamlist () {
    // run inquire, prompt employeeQuestions; promise function if the role is defined as "engineer"
    inquire.prompt(employeeQuestions).then(employeeInfo => {
        //if user selects engineer
        if (employeeInfo.role == "engineer") {
            var addMember = new Engineer(employeeInfo.name, teamList.length + 1, employeeInfo.email, employeeInfo.github);
        } else {
        //if user selects intern
            var addMember = new Intern (employeeinfo.name, teamList.length +1, employeeInfo.email, employeeInfo.school);
        }
        //push new member to teamlist
        teamList.push(addMember);
        //if manager would like to add another team member
        if (employeeInfo.Info.addanother === "Yes") {
           // console.log("");
           // run buildTeam function again
            buildTeamlist();
        } else {
            // if user is finished run builHTMl
            buildHtml();
        }

    })
}

// build base HTML page to put emplyees into
function buildHtml () {
     
    let newFile = fs.readFilesync('./index.html')
    fs.writeFileSync ("/teamPage.html", newFile, function (err) {
        if (err) throw err;
    })

    for (member of teamList) {
        if (member.getRole() === "Manager") {
            buildHtmlCard ("manager", member.getName(), member.getId(), member.getEmail(), "Office:" + member.getOfficeNumbe());
        } else if (member.getRole() === "Engineer") {
            buildHtmlCard ("engineer", member.getName(), member.getID(), member.getEmail(), "Github:" + member.getGithub());
        } else if (member.getRole() == "Intern") {
            buildHtmlCard ("intern", member.getName(), member.getId(), member.getEmail(), "School:" + member.getSchool());
        }
     }
    fs.appendFileSync(".teamPagehtml", "</div></main></bod></html>", function(err){
        if (err) throw err;
    });
}

function buildHtmlCard (memberType, name,id, email, propertyValue) {
    let data = fs.readFileSync(`./${memberType}.html`, 'utf8')
    data = data.replace("nameHere", name);
    data = data.replace("idHere", `ID: ${id}`);
    data. data.replace("emailHere", `Email: <a href="mailto: ${email}">${email}</a>`);
    fs.appendFileSynch("teamPage.html", data, err => {if (err) throw err; })
    console.log("Card appended");
}

function init() {
    inquire.prompt(managerQuestions).then(managerInfo => {
        let teamManager = new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.officeNum);
        teamList.push(teamManager);
        if (managerInfo.hasTeam === "Yes") {
            buildTeamlist();
        } else {
            buildHtmlPage();
        }
    })
}

init();

