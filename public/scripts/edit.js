const editWorkBotton = document.getElementById('submitEdits');
editWorkBotton.addEventListener('click', async ()=>{
    const worker_id = document.getElementById('workerID').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const middleName = document.getElementById('mname').value;
    const section_id = document.getElementById('section_id').value;
    const gender = document.getElementById('gender').value;
    const phone_1 = document.getElementById('phone1').value;
    const phone_2 = document.getElementById('phone2').value;
    const salary = document.getElementById('salary').value;
    const mangerId = document.getElementById('manger').value;

    editDataToServer(worker_id, firstName,lastName,middleName,section_id, gender,phone_1,phone_2,salary, mangerId);
});

const fillBotton = document.getElementById('fillBtn');
fillBotton.addEventListener('click', async ()=>{
        const worker_id = document.getElementById('workerID').value;
        fillDataFromServer();
        idToServer(worker_id);
});

const editDataToServer = async (worker_id, firstName, lastName, middleName, section_id, gender,phone_1, phone_2, salary, mangerId)=>{ 
    await fetch('/update',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        worker_id,
        firstName,
        lastName,
        middleName,
        section_id,
        gender,
        phone_1,
        phone_2,
        salary,
        mangerId,
    })
})};

const fillDataFromServer = async ()=>{ 
    const data = await fetch('/fill',{
    method : 'GET',
    credentials:'same-origin',
})
let number = {};
number = await data.json();
console.log(number);
document.getElementById('fname').value = number.data[0].first_name;
document.getElementById('mname').value = number.data[0].middle_name;
document.getElementById('lname').value = number.data[0].last_name;
document.getElementById('section_id').value = number.data[0].section_id;
document.getElementById('gender').value = number.data[0].gender;
document.getElementById('phone1').value = number.data[0].phone1;
document.getElementById('phone2').value = number.data[0].phone2;
document.getElementById('salary').value = number.data[0].salary;
document.getElementById('manger').value = number.data[0].manager_id;
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