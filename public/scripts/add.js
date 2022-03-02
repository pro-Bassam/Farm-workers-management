const addWorkBotton = document.getElementById('addWorker');
addWorkBotton.addEventListener('click', async ()=>{
    const worker_id = document.getElementById('workerID').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const middleName = document.getElementById('mname').value;
    const section_id = document.getElementById('section_id').value;
    const gender = document.getElementById('gender').value;
    const phone_1 = document.getElementById('phone-1').value;
    const phone_2 = document.getElementById('phone-2').value;
    const salary = document.getElementById('salary').value;
    const mangerId = document.getElementById('manger').value;

    await idToServer(worker_id);
    const data =await getcheck();
    if(data.flag == 1){
       alert("The worker is already exist !!");
    }
    else if (data.flag == 0)
    {
        if(worker_id != '' && firstName != '' && lastName != '' && middleName != '' && lastName != '' && section_id != '' && gender != ''
        && phone_1 != '' && phone_2 != '' && salary != '' && mangerId != ''){
            regDataToServer(worker_id, firstName,lastName,middleName,section_id, gender,phone_1,phone_2,salary, mangerId);
            alert("The worker is added !!");
        } else{
            alert("Please fill data correctly!!");
        }
    }
   
}
);

const idToServer = async (worker_id)=>{ 
    await fetch('/idcheck',{
    method : 'POST',
    credentials:'same-origin',
    headers:{
        "content-Type":"application/json"
    },
    body:JSON.stringify({
        worker_id,
    })
})};

number = {};
const getcheck = async ()=>{ 
    const data = await fetch('/check',{
    method : 'GET',
    credentials:'same-origin',
})
number = await data.json();
return number;
};


const regDataToServer = async (worker_id, firstName,lastName,middleName,section_id, gender,phone_1,phone_2,salary, mangerId)=>{ 
    await fetch('/reg',{
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