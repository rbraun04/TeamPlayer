// TODO: Write code to define and export the Employee class
// build Employee class

class Employee {
    constructor (name, id, email, role,) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }
// retrieve information from the inquirer class to assign
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;