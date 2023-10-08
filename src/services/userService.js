import { users } from "../data/users.js"
import DataError from "../models/dataError.js"
import { MongoLogger } from "../crossCuttingConcerns/mongoLogger.js"
export default class UserService {
    static  customer= "customer";
    static  employee= "employee";

    constructor() {
        this.err = []
        this.employees =  []
        this.customers = [];
        this.loggerService = new MongoLogger();

    }

    load() {
        let wrong = false;
        for (let i=0, len=users.length; i< len; i++) {
            if (UserService.customer === users[i].type){
                if (!this.customercheck(users[i])) {
                    this.customers.push(users[i])
                }
            } else if (UserService.employee === users[i].type){
                if (!this.employeeCheck(users[i])) {
                    this.employees.push(users[i])
                }
            } else {
                wrong = true
            }

            if (wrong)
                this.err.push(new DataError("Wrong user", users[i]))
        }
    }

    customercheck(user) {
        let fields = ["id","firstName", "lastName","age","city"]
        let errcheck = false
        for (const f of fields) {
            if (!err)  errcheck = false
            if (!user[f]) {
                errcheck = true
                this.err.push(
                    new DataError(`Validation problem. ${f} is required`, user))
            }
        }

        if (Number.isNaN(+(+user.age))) {
            errcheck = true

            this.err.push(new DataError(`Validation problem. ${user.age} is not a number`, user))

        }

        return errcheck
    }

    employeeCheck(user) {
        let fields = ["id","firstName", "lastName","age","city","salary"]
        let errcheck = false
        for (const f of fields) {
            if (!err)  errcheck = false
            if (!user[f]) {

                this.err.push(
                    new DataError(`Validation problem. ${f} is required`, user))
            }
        }

        if (Number.isNaN(+(user.age))) {
            errcheck = true
            this.err.push(new DataError(`Validation problem. ${user.age} is not a number`, user))
        }


        return errcheck
    }

    add(user) {
        if(UserService.customer === user.type){
            if (!this.customercheck(user)) {
                this.customers.push(user)
            }
        }

        else if(UserService.employee === user.type){
            if (!this.employeeCheck(user)) {

                this.employees.push(user)
            }
        }

        else{
            this.err.push(
                new DataError("This user can not be added", user))
        }

        this.loggerService.newDocument(user)
    }

    customerList() {
        return this.customers
    }

    getCustomer(id) {
        for (let i = 0, len = this.customers.length; i < len; ++i) {
          if (this.customers[i].id === id) {

            return this.customers[i];

          }
        }

        return null;
    }

    customersSorted(){
        return this.customers.sort((customer1,customer2)=>{
            if(customer2 != null && customer1.firstName>customer2.firstName){ return 1; }
            else if(customer2 != null && customer1.firstName===customer2.firstName){ return 0; }

            else{
                return -1
            }
        })
    }
}