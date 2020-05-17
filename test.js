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

async function Program() {
    // Your Code Here...
    let dateofbirth=[15,05,1996];
    function getAge(dateString) {
        var today = new Date();
        let day = dateString[0];
        var age = today.getFullYear() - dateString[2];
        var m = today.getMonth() - dateString[1];
        //console.log((m === 0 && (today.getDate() < day)));
        if(m <= 0)
        {
            if(m == 0 && today.getDate() < day)
            {
                age--;
            }
            
        }
        return age;
    }
    console.log(getAge(dateofbirth));
}

Program().then(() => {
    process.exit(0);
});