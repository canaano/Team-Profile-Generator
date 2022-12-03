const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

const employees = [];
//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "position",
        message: "What position is this team member?",
        choices: ["manager", "engineer", "intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is name of this team member?",
      },
      {
        type: "input",
        name: "email",
        message: "What is email of this team member?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the id of this team member?",
      },
    ])
    .then(({ position, name, email, id }) => {
      //   console.log(data);
      switch (position) {
        case "manager":
          inquirer
            .prompt([
              {
                type: "input",
                name: "officeNumber",
                message: "What is the managers office number?",
              },
            ])
            .then(({ officeNumber }) => {
              employees.push(new Manager(name, email, id, officeNumber));
              another();
            });
          break;
        case "engineer":
          inquirer
            .prompt([
              {
                type: "input",
                name: "github",
                message: "What is the Engineers github usename?",
              },
            ])
            .then(({ github }) => {
              employees.push(new Engineer(name, email, id, github));
              another();
            });
          break;
        case "intern":
          inquirer
            .prompt([
              {
                type: "input",
                name: "school",
                message: "What school did the intern attend?",
              },
            ])
            .then(({ school }) => {
              employees.push(new Intern(name, email, id, school));
              another();
            });
          break;

        default:
      }
    });
}
function another() {
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "more",
        message: "Do you want to add more employees?",
      },
    ])
    .then(({ more }) => {
      if (more) newEmployee();
      else console.log(employees);
    });
}

function renderHTMLFile() {
  fs.writeFileSync("./index.html");
}
newEmployee();
