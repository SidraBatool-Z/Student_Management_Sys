#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    //Method to enroll a student in a course
    enroll_course(course: string) {
        this.courses.push(course);
    }

    //Method for viewing a student's balance
    view_balance() {
        console.log(chalk.greenBright(`Balance for ${this.name} : $${this.balance}`));
    }

    //Method for paying a student's fee
    pay_fees(amount:number) {
        this.balance -= amount; //using subtraction assignment op
        console.log(chalk.greenBright(`$${amount} paid successfully for ${this.name}.`));
        console.log(chalk.bold.greenBright(`Remaining Balance: $${this.balance}`));
    }

    //Method for displaying a student's status
    show_status() {
        console.log(chalk.cyanBright(`ID: ${this.id}`));
        console.log(chalk.cyanBright(`Name: ${this.name}`));
        console.log(chalk.cyanBright(`Courses: ${this.courses}`));
        console.log(chalk.cyanBright(`Balance:) $${this.balance}`));
    }
}

class Student_manager {
    students: Student[]

    constructor() {
        this.students = [];
    }

    //Method ton add a new student
    add_student(name:string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.yellow(`Student: ${name} added successfully. Student ID: ${student.id}`));
    }

    //Method to enroll a new student in a course
    enroll_student(student_id:number , course:string) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.yellow(`${student.name} enrolled in ${course} successfully.`));
        }
    }

    //Metod to view a student's balance
    view_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.magenta(`No Match. Please Enter the valid Student ID.`))
        }
        
    }

    //Method to pay student fees
    pay_student_fees(student_id:number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.magenta(`No Match. Please Enter a valid Student ID.`))
        }
    }

    //Method to display student status
    show_student_status(student_id:number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }

    //Method to find a student with id
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
}


//Function to run the program

async function main() {
    console.log(chalk.redBright.bold(`\n \tStudent Management System`));
    console.log("-".repeat(60));

    let student_manager = new Student_manager();
    
    //while loop to keep running the program
    while (true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option:",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        
        //Using Switch case to handle user choice
        
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name:",
                    }
                ]);
                student_manager.add_student(name_input.name);

                break;
            
            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter the Course name:",
                    }
                ]);
                student_manager.enroll_student(enroll_input.student_id, enroll_input.course);

                break;
            
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    }
                ]);
                student_manager.view_balance(balance_input.student_id);

                break;
            
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount:",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);

                break;
            
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);

                break;
            
            case "Exit":
                console.log(chalk.gray("Exiting..."));
                process.exit();
        }
    
    }
}

//Calling the main function
main();

