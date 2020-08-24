// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// use extends to add the new class attributes to Employee
class Intern extends Employee {
    constructor (name, id, email, school, role) {
        super (name, id, email);
        this.school = school;
        this.role = role;
    }
// create get School function to retreive school information
    getSchool() {
        return this.school;
    }
// create get Role function to assign role
    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;