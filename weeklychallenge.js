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

}
function getAge(dateString) {
    var today = new Date();
    let day = dateString[0];
    var age = today.getFullYear() - dateString[2];
    var m = today.getMonth() - dateString[1];
    //console.log((m === 0 && (today.getDate() < day)));
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
    let datRegs = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    let Customers = new Array;
    let input = 1;
    while (input != 10) {
        // list of Option
        console.log("[1] Establish Customer ");
        console.log("[2] print list of all Customer");
        console.log("[3] Find Customer by licence number ");
        console.log("[4] apply for a change of name ");
        console.log("[5] List of Customers who are eligible for 10 years Licence.");

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
                }
            case 4:
                {
                    console.log("search by licenc number.");
                    let licnumber = await askQuestion("Enter lic number :");
                    let customer = findcustomer(Customers, licnumber);
                    if (customer) {
                        console.log(`\nThe Customer :  ${customer.CustomerName} has been found.\n`);
                        let newname = await askQuestion("please enter the new name : ");
                        customer.CustomerName = newname;
                        console.log(`Customer Name has been changed to ${newname} `);
                        break;
                    }
                    else {
                        console.log("\nCustomer is Not Exist\n");
                        break;
                    }
                }
            case 5:
                {
                    let customereligible = Customers.filter(TenYearsCustomer);
                    for(let i =0 ; i< customereligible.length ; i++)
                    {
                    printcustomer(customereligible[i]);
                    }
                    break;
                }
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