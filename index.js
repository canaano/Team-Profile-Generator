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
      else renderHTMLFile();
    });
  function renderHTMLFile() {
    fs.writeFileSync(
      "./index.html",
      /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  </head>
  <div class="jumbotron" style="text-align: center; border-bottom: 5px solid black; opacity : .9; background : linear-gradient(to top, rgb(96, 179, 220), rgb(239, 243, 245)); color:black; text-align:center; " id="jumbotron">
    <h1 class="display-4" style="font-weight:bolder;">Team Roster</h1>
    </div>
    <div class="container">
    <div class="row">
  ${employees.map(
    (employee) => /*html*/ `
  <div class= "col-md-3 text-dark bg-light border border-dark rounded-lg" style = "margin : 5px;">
    <h1 class="card-title">${employee.getName()}</h1>
    <h2 class="card-subtitle mb-2 text-dark">${employee.getRole()}</h2>
    <h3 class="card-subtitle mb-2 text-dark">Id: ${employee.getId()}</h3>
    <h4 class="card-subtitle mb-2 text-muted"><a href="mailto:${employee.getEmail()}" class="card-link">${employee.getEmail()}</a></h3>
    <h4 class="card-subtitle mb-2 text-muted"> ${uniqueField(employee)}</h3>
  </div>
  `
  )} 
    </div>
          
          `
    );
  }
}

function uniqueField(employee) {
  switch (employee.getRole()) {
    case "Manager":
      return `Office:${employee.getOfficeNumber()}`;

    // ask for office number
    case "Engineer":
      //ask for git hub
      return `<a href="https://github.com/${employee.getGithub()}" class="card-link">Github</a>`;

    case "Intern":
      // ask about school
      return ` Student at: ${employee.getSchool()}`;
  }
}

newEmployee();
