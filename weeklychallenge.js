const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}
function findcustomer(customer, licencenumber) {

    function findbycustomer(customer) {
        return customer.CustomerLicencenumber == licencenumber
    }

    let cus = customer.find(findbycustomer);
    return cus;
}
function printcustomer(customer) {
    console.log(`\tCustomer Name : ${customer.CustomerName} \t Customer Surname : ${customer.CustmerSurname}`);
    console.log(`\tCustomer Licence Number : ${customer.CustomerLicencenumber}`);
    console.log(`\tCustomer Date Of Birth : ${customer.CustomerDateofbirth[0]} / ${customer.CustomerDateofbirth[1]} / ${customer.CustomerDateofbirth[2]}\n`)
    if (customer.CustomerEmail != undefined) {
        console.log(`\tCustomer Email Adrress : ${customer.CustomerEmail}`);
    }
}
function getAge(dateString) {
    var today = new Date();
    let day = dateString[0];
    var age = today.getFullYear() - dateString[2];
    var m = today.getMonth() - dateString[1];
    if (m <= 0) {
        if (m == 0 && today.getDate() < day) {
            age--;
        }

    }
    return age;
}
function TenYearsCustomer(customer) {
    // Calculate the age of the customer 
    let customerage = getAge(customer.CustomerDateofbirth);
    return customerage >= 21 && customerage <= 45;
}
async function Program() {
    // Your Code Here...
    const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    const datRegs = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    let Customers = new Array;
    let input = 1;
    while (input != 8) {
        // list of Option
        console.log("\n[1] Establish Customer. ");
        console.log("[2] print list of all Customer.");
        console.log("[3] Find Customer by licence number. ");
        console.log("[4] apply for a change of name. ");
        console.log("[5] List of Customers who are eligible for 10 years Licence.");
        console.log("[6] check Customer if eligible for 10 years licence.");
        console.log("[7] Add Email Address.");
        console.log("[8] EXITE\n");
        //Ask User for Input
        input = await askQuestion("Enter your Input: ");
        input = parseInt(input);
        switch (input) {
            case 1:
                {
                    // Establish new Customer
                    console.log("Adding new Customer: \n");
                    let name = await askQuestion("name : ");
                    let surname = await askQuestion("surname : ");
                    let licencenumber = await askQuestion("licence number : ");
                    if (findcustomer(Customers, licencenumber)) {
                        console.log("Customer is already Existe..");
                        break;
                    }
                    console.log("Date Of Birth : dd-mm-yyyy");
                    let date = await askQuestion("");
                    let dateOfBirth;
                    while (true) {
                        if (datRegs.test(date)) {
                            dateOfBirth = date.split("\-");
                            break;
                        }
                        else {
                            console.log("Please Enter Valid date with the format dd-mm-yyyy \n");
                            date = await askQuestion("");
                        }
                    }
                    let customer = {
                        CustomerName: name,
                        CustmerSurname: surname,
                        CustomerLicencenumber: licencenumber,
                        CustomerDateofbirth: dateOfBirth
                    }
                    Customers.push(customer);
                    break;
                }
            case 2:
                {
                    // Print Customer..
                    if (Customers.length == 0) {
                        console.log("\nThere are No Customers \n");
                    }
                    else {
                        console.log("\nThe List Of all Customers : \n");
                        for (let i = 0; i < Customers.length; i++) {
                            printcustomer(Customers[i]);
                            console.log("--------------------------------------\n");
                        }
                    }
                    break;
                }
            case 3:
                {
                    // find CUSTOMER 
                    if (Customers.length != 0) {
                        console.log("search by licence number.");
                        let licnumber = await askQuestion("Enter licence number :");
                        let customer = findcustomer(Customers, licnumber);
                        if (customer) {
                            console.log("\nThe Customer has been found\n");
                            printcustomer(customer);
                            break;
                        }
                        else {
                            console.log("\nCustomer is Not Exist.\n");
                            break;
                        }
                    } else {
                        console.log("\nThere is no Customer in the Qeue.\n");
                        break;
                    }
                }
            case 4:
                {
                    // change of name
                    if (Customers.length != 0) {
                        console.log("search by licence number.");
                        let licnumber = await askQuestion("Enter licence number :");
                        let customer = findcustomer(Customers, licnumber);
                        if (customer) {
                            console.log(`\nThe Customer ${customer.CustomerName} has been found.\n`);
                            let newname = await askQuestion("Name : ");
                            let newsurname = await askQuestion("Surname : ");
                            customer.CustomerName = newname;
                            customer.CustmerSurname = newsurname;
                            console.log(`Customer Name has been changed to ${newname} ${newsurname} `);
                            break;
                        }
                        else {
                            console.log("\nCustomer is Not Exist\n");
                            break;
                        }
                    } else {
                        console.log("\nTher is no Customer in the Qeue.\n");
                        break;
                    }
                }
            case 5:
                {
                    /// list of the customers are eligible for 10y lic
                    if (Customers.length != 0) {
                        let customereligible = Customers.filter(TenYearsCustomer);
                        if (customereligible.length == 0) {
                            console.log("\n There is no Customer \n");
                            break;
                        }
                        for (let i = 0; i < customereligible.length; i++) {
                            printcustomer(customereligible[i]);
                        }
                        break;
                    } else {
                        console.log("\nThere is no Customer in the Qeue.\n");
                        break;
                    }
                }
            case 6:
                {
                    // check if the customer eligible for 10 years licence..
                    if (Customers.length != 0) {
                        console.log("search by licence number.");
                        let licnumber = await askQuestion("Enter lic number :");
                        let customer = findcustomer(Customers, licnumber);
                        if (customer == undefined) {
                            console.log("The Customer is not Existe.");
                            break;
                        }
                        let eligible = TenYearsCustomer(customer);
                        if (eligible == true) {
                            console.log(`Customer ${customer.CustomerName} is eligible for 10 years licence`);
                            break;
                        }
                        else {
                            console.log(`Customer ${customer.CustomerName} is NOT eligible for 10 years licence`)
                            break;
                        }
                    } else {
                        console.log("\nThere is no Customer in the Qeue.\n");
                        break;
                    }

                }
            case 7:
                {
                    // ADD email Addresse .. 
                    if (Customers.length == 0) {
                        console.log("\n There is No Customer in the Qeue")
                        break;
                    } else {
                        console.log("search by licence number.");
                        let licnumber = await askQuestion("Enter licence number :");
                        let customer = findcustomer(Customers, licnumber);
                        if (customer == undefined) {
                            console.log("The Customer is not Existe.");
                            break;
                        }
                        let customeremail = await askQuestion("Add Email address : ");
                        let validemail = EMAIL_REGEX.test(customeremail);
                        while (!validemail) {
                            console.log("Email is not Valid Try Again :");
                            customeremail = await askQuestion("Add Email address : ");
                            validemail = EMAIL_REGEX.test(customeremail);
                        }
                        customer.CustomerEmail = customeremail;

                    }
                }
            case 8: break;
            default:
                {
                    console.log("\nPlease select from the List \n");
                }

        }

    }

}

Program().then(() => {
    process.exit(0);
});