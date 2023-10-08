import {User} from "./user";

export default class Employee extends User{
    constructor(id, firstName, lastName, city,age, employeeSalary) {
        super(id, firstName, lastName, city,age );
        this.salary = employeeSalary
    }
}