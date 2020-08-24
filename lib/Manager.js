// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// use extends to add the new class attributes to Employee
class Manager extends Employee {
    constructor (name, id, email, officeNumber, role) {
        super (name, id, email);
        this.officeNumber = officeNumber;
        this.role = role;
    }
// create get Office Number function to retreive office information

// create get Role function to assign role
    getRole() {
        return 'Manager';
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;