const editWorkBotton = document.getElementById('submitEdits');
editWorkBotton.addEventListener('click', async ()=>{
    const worker_id = document.getElementById('workerID').value
    idToServer(worker_id);
    getDataFromServer();
});


const showAllData = document.getElementById('showAll');
showAllData.addEventListener('click', async ()=>{
    showAllDataFromServer();
});

const totalData = document.getElementById('total');
totalData.addEventListener('click', async ()=>{
    totalDataFromServer();
});

const getDataFromServer = async ()=>{ 
    const data = await fetch('/show',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
console.log(number);

let code = '<label for="">Worker Info</label>' +
                '<p>-------------------</p>' +
                `<p>Worker ID: ${number.data[0].worker_id}</p>` +
                `<p>First Name: ${number.data[0].first_name}</p>` +
                `<p>Middle Name: ${number.data[0].middle_name}</p>` +
                `<p>Last Name: ${number.data[0].last_name}</p>` +
                `<p>Section ID: ${number.data[0].section_id}</p>` +
                `<p>Gender: ${number.data[0].gender}</p>` +
                `<p>Phone 1: ${number.data[0].phone1}</p>` +
                `<p>Phone 2: ${number.data[0].phone2}</p>` +
                `<p>Salary: ${number.data[0].salary}</p>` +
                `<p>Manager ID: ${number.data[0].manager_id}</p>` +
                '<hr>' +
                '<br><br>';
    document.getElementById('clintNumDiv').innerHTML = code;
return number;
};


const idToServer = async (worker_id)=>{ 
    await fetch('/id',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        worker_id,
    })
})};


const showAllDataFromServer = async ()=>{ 
    const data = await fetch('/showAll',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
console.log(number.data.length);
let code = '';
let all = '<label for="">Worker Info:</label>' +
            '<p>------------------</p>';
for (let i = 0; i < number.data.length; i++) {
     code =     `<div id='${i}'>` +
                `<p>Worker ID: ${number.data[i].worker_id}</p>` +
                `<p>First Name: ${number.data[i].first_name}</p>` +
                `<p>Middle Name: ${number.data[i].middle_name}</p>` +
                `<p>Last Name: ${number.data[i].last_name}</p>` +
                `<p>Section ID: ${number.data[i].section_id}</p>` +
                `<p>Gender: ${number.data[i].gender}</p>` +
                `<p>Phone 1: ${number.data[i].phone1}</p>` +
                `<p>Phone 2: ${number.data[i].phone2}</p>` +
                `<p>Salary: ${number.data[i].salary}</p>` +
                `<p>Manager ID: ${number.data[i].manager_id}</p>` +
                '<hr>' +
                '</div>';
                
                console.log('-----------record----------');
                console.log(code);
                all += code;
                
}
document.getElementById('clintNumDiv').innerHTML = all;
return number;
};


const totalDataFromServer = async ()=>{ 
    const data = await fetch('/total',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
console.log(number.data.length);
let code =      `<div'>` +
                `<p>Total number of workers: ${number.data.length}</p>` +
                '</div>';

document.getElementById('clintNumDiv').innerHTML = code;
return number;
};