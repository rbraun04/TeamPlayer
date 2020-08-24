// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// use extends to add the new class attributes to Engineer
class Engineer extends Employee {
    constructor (name, id, email, github, role) {
        super (name, id, email);
        this.github = github;
        this.role = role;
    }
// create get Github function to retreive school information
    getGithub() {
        return this.github;
    }
// create get Role function to assign role
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;